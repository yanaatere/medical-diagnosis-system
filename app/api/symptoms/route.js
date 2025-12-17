import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET all symptoms
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM symptoms ORDER BY code ASC
    `;
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new symptom
export async function POST(request) {
  try {
    const { code, name, category } = await request.json();
    
    const result = await sql`
      INSERT INTO symptoms (code, name, category)
      VALUES (${code}, ${name}, ${category})
      RETURNING *
    `;
    
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update symptom
export async function PUT(request) {
  try {
    const { id, code, name, category } = await request.json();
    
    const result = await sql`
      UPDATE symptoms 
      SET code = ${code}, name = ${name}, category = ${category}, 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    
    return NextResponse.json({ success: true, data: result.rows[0] });
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