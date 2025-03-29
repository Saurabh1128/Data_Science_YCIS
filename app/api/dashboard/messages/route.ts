import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('datascience');
    const collection = db.collection('contactMessages');
    
    // Fetch all messages and sort by creation date (newest first)
    const messages = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      messages
    });
    
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch messages',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 