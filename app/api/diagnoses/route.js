import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET all diagnoses with patient and disease info
export async function GET() {
  try {
    const result = await sql`
      SELECT 
        d.id, d.notes, d.diagnosis_date, d.status,
        p.id as patient_id, p.name as patient_name,
        dis.id as disease_id, dis.name as disease_name, dis.code as disease_code,
        ARRAY_AGG(s.name) as symptoms
      FROM diagnoses d
      LEFT JOIN patients p ON d.patient_id = p.id
      LEFT JOIN diseases dis ON d.disease_id = dis.id
      LEFT JOIN diagnosis_symptoms ds ON d.id = ds.diagnosis_id
      LEFT JOIN symptoms s ON ds.symptom_id = s.id
      GROUP BY d.id, p.id, p.name, dis.id, dis.name, dis.code
      ORDER BY d.diagnosis_date DESC
    `;
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new diagnosis
export async function POST(request) {
  try {
    const { patient_id, disease_id, symptom_ids, notes, status } = await request.json();
    
    // Insert diagnosis
    const diagnosisResult = await sql`
      INSERT INTO diagnoses (patient_id, disease_id, notes, status)
      VALUES (${patient_id}, ${disease_id}, ${notes}, ${status || 'Selesai'})
      RETURNING *
    `;
    
    const diagnosis = diagnosisResult.rows[0];
    
    // Insert diagnosis symptoms
    if (symptom_ids && symptom_ids.length > 0) {
      for (const symptom_id of symptom_ids) {
        await sql`
          INSERT INTO diagnosis_symptoms (diagnosis_id, symptom_id)
          VALUES (${diagnosis.id}, ${symptom_id})
        `;
      }
    }
    
    return NextResponse.json({ success: true, data: diagnosis });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE diagnosis
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await sql`DELETE FROM diagnoses WHERE id = ${id}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}