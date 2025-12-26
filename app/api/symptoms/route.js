import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET all symptoms
export async function GET() {
  try {
    const result = await sql`
      SELECT s.*, COALESCE(json_agg(json_build_object('id', d.id, 'code', d.code, 'name', d.name) ORDER BY d.code) FILTER (WHERE d.id IS NOT NULL), '[]') AS diseases
      FROM symptoms s
      LEFT JOIN symptom_diseases sd ON sd.symptom_id = s.id
      LEFT JOIN diseases d ON d.id = sd.disease_id
      GROUP BY s.id
      ORDER BY s.code ASC
    `;

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new symptom
export async function POST(request) {
  try {
    const { code, name, category, disease_ids } = await request.json();

    const insertRes = await sql`
      INSERT INTO symptoms (code, name, category)
      VALUES (${code}, ${name}, ${category})
      RETURNING *
    `;

    const symptom = insertRes.rows[0];

    if (Array.isArray(disease_ids) && disease_ids.length) {
      await Promise.all(disease_ids.map((did) => sql`
        INSERT INTO symptom_diseases (symptom_id, disease_id) VALUES (${symptom.id}, ${did})
      `));
    }

    // attach diseases to response
    const diseasesRes = await sql`
      SELECT d.id, d.code, d.name FROM diseases d
      JOIN symptom_diseases sd ON sd.disease_id = d.id
      WHERE sd.symptom_id = ${symptom.id}
      ORDER BY d.code ASC
    `;

    symptom.diseases = diseasesRes.rows;

    return NextResponse.json({ success: true, data: symptom });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update symptom
export async function PUT(request) {
  try {
    const { id, code, name, category, disease_ids } = await request.json();

    const updateRes = await sql`
      UPDATE symptoms
      SET code = ${code}, name = ${name}, category = ${category}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    const symptom = updateRes.rows[0];

    // replace associations
    await sql`DELETE FROM symptom_diseases WHERE symptom_id = ${id}`;
    if (Array.isArray(disease_ids) && disease_ids.length) {
      await Promise.all(disease_ids.map((did) => sql`
        INSERT INTO symptom_diseases (symptom_id, disease_id) VALUES (${id}, ${did})
      `));
    }

    const diseasesRes = await sql`
      SELECT d.id, d.code, d.name FROM diseases d
      JOIN symptom_diseases sd ON sd.disease_id = d.id
      WHERE sd.symptom_id = ${id}
      ORDER BY d.code ASC
    `;

    symptom.diseases = diseasesRes.rows;

    return NextResponse.json({ success: true, data: symptom });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE symptom
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await sql`DELETE FROM symptoms WHERE id = ${id}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}