import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    const result = await testConnection();
    
    if (result.success) {
      console.log('MongoDB connection test successful:', result.message);
      return NextResponse.json({
        success: true,
        message: result.message,
        timestamp: new Date().toISOString()
      });
    } else {
      console.error('MongoDB connection test failed:', result.error);
      return NextResponse.json({
        success: false,
        message: result.message,
        error: result.error,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in DB connection test API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      success: false,
      message: 'Error testing database connection',
      error: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 