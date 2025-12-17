import { NextResponse } from 'next/server';
import { initDatabase, seedAdmin, seedSampleData } from '@/lib/db';

export async function GET() {
  try {
    await initDatabase();
    await seedAdmin();
    await seedSampleData();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully! Admin credentials: username=admin, password=admin123' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}