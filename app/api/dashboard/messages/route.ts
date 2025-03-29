import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { MongoClient } from 'mongodb';

export async function GET() {
  console.log('Dashboard messages API route called');
  try {
    // Connect to MongoDB with timeout
    console.log('Attempting to connect to MongoDB...');
    let client: MongoClient;
    
    try {
      client = await Promise.race([
        clientPromise,
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('MongoDB connection timeout')), 5000)
        )
      ]);
      console.log('MongoDB connection successful');
    } catch (connectionError) {
      console.error('MongoDB connection failed:', connectionError);
      // Return empty messages array as fallback
      console.log('Using fallback - returning empty messages array');
      return NextResponse.json({
        success: true,
        messages: [],
        fallback: true
      });
    }
    
    const db = client.db('datascience');
    const collection = db.collection('contactMessages');
    
    console.log('Fetching messages from collection');
    // Fetch all messages and sort by creation date (newest first)
    try {
      const messages = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      console.log(`Successfully fetched ${messages.length} messages`);
      return NextResponse.json({
        success: true,
        messages
      });
    } catch (dbError) {
      console.error('Error performing database operation:', dbError);
      // Return empty messages as fallback
      return NextResponse.json({
        success: true,
        messages: [],
        fallback: true
      });
    }
    
  } catch (error) {
    console.error('Error in messages API route:', error);
    
    // Create a more detailed error response
    let errorMessage = 'Failed to fetch messages';
    let errorDetails = '';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || '';
    }
    
    // Log the detailed error for debugging
    console.error('Detailed error:', {
      message: errorMessage,
      details: errorDetails,
      type: error instanceof Error ? error.constructor.name : typeof error
    });
    
    // Return empty messages array with success status for better UX
    return NextResponse.json({
      success: true,
      messages: [],
      fallback: true
    });
  }
} 