import { NextResponse } from 'next/server';
import clientPromiseFn from '@/lib/mongodb';

// Simple route to test MongoDB connection
export async function GET() {
  try {
    console.log('API: Testing MongoDB connection...');
    
    // Get MongoDB client
    const client = await clientPromiseFn();
    
    // Try a simple operation to verify connectivity
    const testDb = client.db('datascience');
    const collections = await testDb.listCollections().toArray();
    
    // Return success response with collection list
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      collections: collections.map(c => c.name),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API: MongoDB connection test failed:', error);
    
    // Provide detailed error information
    return NextResponse.json(
      {
        success: false,
        message: 'MongoDB connection failed',
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 