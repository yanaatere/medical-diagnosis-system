-- Migration: create symptom_diseases join table and migrate existing disease_id
-- Date: 2025-12-26

BEGIN;

-- 1) Create join table if it doesn't exist
CREATE TABLE IF NOT EXISTS symptom_diseases (
  id SERIAL PRIMARY KEY,
  symptom_id INTEGER NOT NULL REFERENCES symptoms(id) ON DELETE CASCADE,
  disease_id INTEGER NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (symptom_id, disease_id)
);

-- 2) Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_symptom_diseases_symptom_id ON symptom_diseases(symptom_id);
CREATE INDEX IF NOT EXISTS idx_symptom_diseases_disease_id ON symptom_diseases(disease_id);

-- 3) Migrate existing data from symptoms.disease_id (if column exists)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'symptoms' AND column_name = 'disease_id'
  ) THEN
    INSERT INTO symptom_diseases (symptom_id, disease_id)
    SELECT id AS symptom_id, disease_id
    FROM symptoms
    WHERE disease_id IS NOT NULL
    ON CONFLICT (symptom_id, disease_id) DO NOTHING;
  END IF;
END$$;

-- 4) Drop old column if present (optional but recommended after verifying migration)
ALTER TABLE symptoms
  DROP COLUMN IF EXISTS disease_id;

COMMIT;

-- NOTES:
-- - Review the data after running this migration. If you prefer to keep the old column,
--   comment out the ALTER TABLE ... DROP COLUMN section before running.
-- - Recommended workflow:
--   1) Backup DB
--   2) Run this script
--   3) Verify symptom_diseases contains expected rows
--   4) Remove old column (if not already dropped) only after verification
