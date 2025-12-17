import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET all diseases
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM diseases ORDER BY code ASC
    `;
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new disease
export async function POST(request) {
  try {
    const { code, name, description, solution } = await request.json();
    
    const result = await sql`
      INSERT INTO diseases (code, name, description, solution)
      VALUES (${code}, ${name}, ${description}, ${solution})
      RETURNING *
    `;
    
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update disease
export async function PUT(request) {
  try {
    const { id, code, name, description, solution } = await request.json();
    
    const result = await sql`
      UPDATE diseases 
      SET code = ${code}, name = ${name}, description = ${description}, 
          solution = ${solution}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE disease
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    await sql`DELETE FROM diseases WHERE id = ${id}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}