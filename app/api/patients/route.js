import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET all patients
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM patients ORDER BY created_at DESC
    `;
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new patient
export async function POST(request) {
  try {
    const { name, age, gender, address, phone } = await request.json();
    
    const result = await sql`
      INSERT INTO patients (name, age, gender, address, phone)
      VALUES (${name}, ${age}, ${gender}, ${address}, ${phone})
      RETURNING *
    `;
    
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update patient
export async function PUT(request) {
  try {
    const { id, name, age, gender, address, phone } = await request.json();
    
    const result = await sql`
      UPDATE patients 
      SET name = ${name}, age = ${age}, gender = ${gender}, 
          address = ${address}, phone = ${phone}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE patient
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await sql`DELETE FROM patients WHERE id = ${id}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}