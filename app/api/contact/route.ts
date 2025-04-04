import { NextResponse } from 'next/server';
import clientPromiseFn from '@/lib/mongodb';

// Store messages in memory when file system isn't available 
// (useful for Vercel serverless functions)
let inMemoryQueue: any[] = [];

// Generate a simple unique ID without external dependencies
function generateId() {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

// Function to save a message to a memory queue if MongoDB is down
async function saveMessageToQueue(messageData: any) {
  try {
    // In Vercel's serverless environment, we can't rely on the file system
    // So we'll use an in-memory queue instead (note: this will be lost on deployment)
    const queueItem = {
      ...messageData,
      id: generateId(),
      queuedAt: new Date().toISOString(),
    };
    
    // Add to in-memory queue
    inMemoryQueue.push(queueItem);
    
    // Limit queue size to prevent memory issues
    if (inMemoryQueue.length > 100) {
      inMemoryQueue = inMemoryQueue.slice(-100);
    }
    
    console.log(`Message saved to in-memory queue. Queue size: ${inMemoryQueue.length}`);
    return true;
  } catch (error) {
    console.error('Failed to save message to queue:', error);
    return false;
  }
}

export async function POST(request: Request) {
  console.log('Contact form submission received');
  
  try {
    // Get API key from request header or query parameter
    const url = new URL(request.url);
    const apiKeyHeader = request.headers.get('x-api-key');
    const apiKeyQuery = url.searchParams.get('api_key');
    const apiKey = apiKeyHeader || apiKeyQuery;
    
    // Enhanced debugging for API key validation
    console.log('Request URL:', request.url);
    console.log('Headers received:', [...request.headers.entries()].map(([key, value]) => `${key}: ${value}`));
    console.log('API Key from header:', apiKeyHeader);
    console.log('API Key from query:', apiKeyQuery);
    
    // Get expected API key from environment
    const expectedApiKey = process.env.API_KEY;
    console.log('Expected API Key (env):', expectedApiKey ? `${expectedApiKey.substring(0, 6)}...` : 'undefined');
    
    // Check if API key is valid
    if (!apiKey || apiKey !== expectedApiKey) {
      console.log('API: Invalid or missing API key');
      console.log('Received:', apiKey ? `${apiKey.substring(0, 6)}...` : 'undefined');
      console.log('Expected:', expectedApiKey ? `${expectedApiKey.substring(0, 6)}...` : 'undefined');
      console.log('Match:', apiKey === expectedApiKey);
      
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized: Invalid or missing API key',
          timestamp: new Date().toISOString()
        },
        { status: 401 }
      );
    }
    
    console.log('API Key validation successful');
    
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    const { name, email, subject, message } = body;
    
    if (!name || !email || !message) {
      console.log('Missing required fields:', { name, email, message });
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    const client = await clientPromiseFn();
    const db = client.db('datascience');
    const messagesCollection = db.collection('contact_messages');
    
    // Create the document to insert
    const messageDoc = {
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      read: false,
      archived: false,
      createdAt: new Date(),
    };
    
    // Insert the message into the database
    console.log('Inserting message into database');
    const result = await messagesCollection.insertOne(messageDoc);
    
    if (!result.acknowledged) {
      throw new Error('Failed to insert message into database');
    }
    
    console.log('Message saved successfully with ID:', result.insertedId);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will get back to you soon.',
      messageId: result.insertedId,
    });
    
  } catch (error) {
    console.error('Error handling contact form submission:', error);
    
    // Return detailed error information
    return NextResponse.json(
      {
        success: false,
        message: 'We encountered an error processing your request. Please try again later.',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
} 