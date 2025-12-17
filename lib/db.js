import { sql } from '@vercel/postgres';

// Initialize database tables
export async function initDatabase() {
  try {
    // Create users table (untuk admin)
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create patients table
    await sql`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER NOT NULL,
        gender VARCHAR(20) NOT NULL,
        address TEXT,
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create diseases table
    await sql`
      CREATE TABLE IF NOT EXISTS diseases (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        solution TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create symptoms table
    await sql`
      CREATE TABLE IF NOT EXISTS symptoms (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create diagnoses table
    await sql`
      CREATE TABLE IF NOT EXISTS diagnoses (
        id SERIAL PRIMARY KEY,
        patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
        disease_id INTEGER REFERENCES diseases(id),
        notes TEXT,
        diagnosis_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'Selesai'
      )
    `;

    // Create diagnosis_symptoms table (many-to-many relationship)
    await sql`
      CREATE TABLE IF NOT EXISTS diagnosis_symptoms (
        id SERIAL PRIMARY KEY,
        diagnosis_id INTEGER REFERENCES diagnoses(id) ON DELETE CASCADE,
        symptom_id INTEGER REFERENCES symptoms(id) ON DELETE CASCADE
      )
    `;

    console.log('Database tables created successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error initializing database:', error);
    return { success: false, error: error.message };
  }
}

// Seed initial admin user
export async function seedAdmin() {
  try {
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await sql`
      INSERT INTO users (username, password, name, role)
      VALUES ('admin', ${hashedPassword}, 'Administrator', 'admin')
      ON CONFLICT (username) DO NOTHING
    `;
    
    console.log('Admin user seeded successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding admin:', error);
    return { success: false, error: error.message };
  }
}

// Seed sample data
export async function seedSampleData() {
  try {
    // Sample diseases
    await sql`
      INSERT INTO diseases (code, name, description, solution)
      VALUES 
        ('P001', 'Flu & Batuk', 'Infeksi saluran pernapasan akut yang menyebabkan batuk dan demam', 'Istirahat cukup, minum air hangat, konsumsi vitamin C'),
        ('P002', 'Demam Berdarah', 'Penyakit yang ditularkan oleh nyamuk Aedes aegypti', 'Rawat inap, banyak minum cairan, kompres demam, konsultasi dokter'),
        ('P003', 'Tifus', 'Infeksi bakteri Salmonella typhi yang menyebabkan demam tinggi', 'Antibiotik sesuai resep dokter, istirahat total, makan makanan lunak')
      ON CONFLICT (code) DO NOTHING
    `;

    // Sample symptoms
    await sql`
      INSERT INTO symptoms (code, name, category)
      VALUES 
        ('G001', 'Demam tinggi', 'Umum'),
        ('G002', 'Batuk kering', 'Pernapasan'),
        ('G003', 'Sakit kepala', 'Neurologis'),
        ('G004', 'Nyeri otot', 'Muskuloskeletal'),
        ('G005', 'Mual', 'Pencernaan'),
        ('G006', 'Pilek', 'Pernapasan'),
        ('G007', 'Bintik merah', 'Kulit'),
        ('G008', 'Muntah', 'Pencernaan'),
        ('G009', 'Lemas', 'Umum'),
        ('G010', 'Kehilangan nafsu makan', 'Pencernaan')
      ON CONFLICT (code) DO NOTHING
    `;

    console.log('Sample data seeded successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding sample data:', error);
    return { success: false, error: error.message };
  }
}