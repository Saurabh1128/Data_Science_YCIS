import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields'
        },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('datascience');
    const collection = db.collection('contactMessages');
    
    // Create a document with form data and timestamp
    const contactMessage = {
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
      status: 'unread'  // Default status for new messages
    };
    
    // Insert the document into the collection
    const result = await collection.insertOne(contactMessage);
    
    return NextResponse.json({
      success: true,
      message: 'Message submitted successfully',
      id: result.insertedId
    });
    
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit message',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 