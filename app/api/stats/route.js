import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Total patients
    const patientsCount = await sql`SELECT COUNT(*) FROM patients`;
    
    // Total diseases
    const diseasesCount = await sql`SELECT COUNT(*) FROM diseases`;
    
    // Total symptoms
    const symptomsCount = await sql`SELECT COUNT(*) FROM symptoms`;
    
    // Total diagnoses
    const diagnosesCount = await sql`SELECT COUNT(*) FROM diagnoses`;
    
    // Today's diagnoses
    const todayDiagnoses = await sql`
      SELECT COUNT(*) FROM diagnoses 
      WHERE DATE(diagnosis_date) = CURRENT_DATE
    `;
    
    // Most common diseases
    const topDiseases = await sql`
      SELECT 
        dis.name, 
        dis.code,
        COUNT(d.id) as count,
        ROUND(COUNT(d.id) * 100.0 / NULLIF((SELECT COUNT(*) FROM diagnoses), 0), 0) as percentage
      FROM diseases dis
      LEFT JOIN diagnoses d ON dis.id = d.disease_id
      GROUP BY dis.id, dis.name, dis.code
      ORDER BY count DESC
      LIMIT 5
    `;
    
    return NextResponse.json({
      success: true,
      stats: {
        totalPatients: parseInt(patientsCount.rows[0].count),
        totalDiseases: parseInt(diseasesCount.rows[0].count),
        totalSymptoms: parseInt(symptomsCount.rows[0].count),
        totalDiagnoses: parseInt(diagnosesCount.rows[0].count),
        todayDiagnoses: parseInt(todayDiagnoses.rows[0].count),
        topDiseases: topDiseases.rows
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}