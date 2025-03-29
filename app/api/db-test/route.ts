import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    // Connect to the MongoDB client
    const client = await clientPromise;
    
    // Get the database and run a simple command to verify connection
    const db = client.db('datascience');
    const isConnected = await db.command({ ping: 1 });
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully connected to MongoDB',
      isConnected,
      dbName: db.databaseName
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to connect to MongoDB',
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
} 