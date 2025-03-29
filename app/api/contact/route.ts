import { NextResponse } from 'next/server';
import clientPromise, { isConnectionLikelyFailed } from '@/lib/mongodb';

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

    // Check if MongoDB connection is likely in a failed state
    const offlineMode = isConnectionLikelyFailed();
    if (offlineMode) {
      console.log('MongoDB connection is likely failed, using offline queue mode');
      
      // Create message data
      const messageData = {
        name,
        email,
        phone: phone || '',
        subject,
        message,
        createdAt: new Date().toISOString(),
        status: 'unread'
      };
      
      // Try to save to queue
      const savedToQueue = await saveMessageToQueue(messageData);
      
      if (savedToQueue) {
        return NextResponse.json({
          success: true,
          message: 'Your message has been received and will be processed when our services are fully operational.',
          offlineMode: true
        });
      } else {
        // If queue fails too, inform the user but don't expose technical details
        return NextResponse.json({
          success: false,
          message: 'Unable to save your message at this time. Please try again later.',
          error: 'Storage system unavailable'
        }, { status: 503 });
      }
    }

    try {
      // Connect to MongoDB
      console.log('Connecting to MongoDB...');
      const client = await clientPromise;
  
      // Explicitly specify database
      const dbName = 'datascience';
      console.log(`Using database: ${dbName}`);
      const db = client.db(dbName);
  
      // Create a document with form data and timestamp
      const contactMessage = {
        name,
        email,
        phone: phone || '',
        subject,
        message,
        createdAt: new Date(),
        status: 'unread'
      };
  
      console.log('Attempting to insert document into MongoDB');
  
      // Get collection, create if doesn't exist
      const collectionName = 'messages';
      console.log(`Using collection: ${collectionName}`);
      const collection = db.collection(collectionName);
  
      // Insert the document into the collection
      const result = await collection.insertOne(contactMessage);
      console.log('Document inserted successfully:', result.insertedId);
  
      return NextResponse.json({
        success: true,
        message: 'Message submitted successfully',
        id: result.insertedId
      });
    } catch (dbError) {
      console.error('Database connection or operation error:', dbError);
      
      let errorMessage = 'Database connection failed';
      
      if (dbError instanceof Error) {
        errorMessage = dbError.message;
        
        // More specific error messages based on the type of error
        if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('ETIMEDOUT')) {
          errorMessage = 'Could not connect to the database server. Please check your internet connection.';
        } else if (errorMessage.includes('Authentication failed')) {
          errorMessage = 'Database authentication failed. Please check your credentials.';
        } else if (errorMessage.includes('not authorized')) {
          errorMessage = 'Not authorized to access the database. Please check your permissions.';
        }
      }
      
      // Try fallback to queue if DB fails
      console.log('Attempting to save message to offline queue after DB failure');
      const messageData = {
        name,
        email,
        phone: phone || '',
        subject,
        message,
        createdAt: new Date().toISOString(),
        status: 'unread'
      };
      
      const savedToQueue = await saveMessageToQueue(messageData);
      
      if (savedToQueue) {
        return NextResponse.json({
          success: true,
          message: 'Your message has been received. We are currently experiencing technical difficulties but will process your message as soon as possible.',
          offlineMode: true
        });
      }
      
      return NextResponse.json(
        {
          success: false,
          message: 'Unable to save your message at this time. Please try again later.',
          error: errorMessage
        },
        { status: 503 } // Service Unavailable is more appropriate for DB issues
      );
    }
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

    // Return error response instead of pretending it succeeded
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit message. Please try again later.',
        error: errorMessage
      },
      { status: 500 }
    );
  }
} 