import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  console.log('Contact API route received a request');
  
  try {
    // Parse the request body
    const body = await request.json();
    console.log('Received form data:', body);
    
    // Validate required fields
    const { name, email, subject, message, phone } = body;
    
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields:', { name, email, subject, message });
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields'
        },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    console.log('Attempting to connect to MongoDB...');
    const client = await clientPromise;
    console.log('MongoDB connection successful');
    
    const db = client.db('datascience');
    const collection = db.collection('contactMessages');
    
    // Create a document with form data and timestamp
    const contactMessage = {
      name,
      email,
      phone: phone || '',  // Make phone optional
      subject,
      message,
      createdAt: new Date(),
      status: 'unread'  // Default status for new messages
    };
    
    console.log('Attempting to insert document into MongoDB');
    // Insert the document into the collection
    const result = await collection.insertOne(contactMessage);
    console.log('Document inserted successfully:', result.insertedId);
    
    return NextResponse.json({
      success: true,
      message: 'Message submitted successfully',
      id: result.insertedId
    });
    
  } catch (error) {
    console.error('Error in contact API route:', error);
    
    // Create a more detailed error response
    let errorMessage = 'Failed to submit message';
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
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit message',
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    );
  }
} 