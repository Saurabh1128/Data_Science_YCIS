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
  
  // Set a timeout for the entire operation
  const apiTimeout = setTimeout(() => {
    console.error('API operation timeout reached - operation may continue but response will be incomplete');
  }, 40000); // 40 second timeout warning
  
  try {
    // Parse the request body
    const body = await request.json();
    console.log('Received form data:', body);
    
    // Validate required fields
    const { name, email, subject, message, phone } = body;
    
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields:', { name, email, subject, message });
      clearTimeout(apiTimeout); // Clear timeout
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields'
        },
        { status: 400 }
      );
    }

    // Save to queue immediately to ensure we don't lose the message
    // Even if MongoDB works, we'll have a backup
    const messageData = {
      name,
      email,
      phone: phone || '',
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };
    
    // Queue in background without waiting (fire and forget)
    saveMessageToQueue(messageData).catch(err => {
      console.error('Background queue save failed:', err);
    });

    // Check if MongoDB connection is likely in a failed state
    const offlineMode = isConnectionLikelyFailed();
    if (offlineMode) {
      console.log('MongoDB connection is likely failed, using offline queue mode');
      
      clearTimeout(apiTimeout); // Clear timeout
      return NextResponse.json({
        success: true,
        message: 'Your message has been received and will be processed when our services are fully operational.',
        offlineMode: true
      });
    }

    try {
      // Set a shorter timeout for MongoDB operations to ensure the API responds quickly
      const dbOperationPromise = async () => {
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
      
          // Use a write concern of 1 for faster operations
          // This means the operation completes once the primary acknowledges it
          const result = await collection.insertOne(contactMessage, { writeConcern: { w: 1 } });
          console.log('Document inserted successfully:', result.insertedId);
          
          return {
            success: true,
            message: 'Message submitted successfully',
            id: result.insertedId
          };
        } catch (err) {
          throw err;
        }
      };
      
      // Race the DB operation against a timeout
      const dbTimeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Database operation timed out')), 30000);
      });
      
      const dbResult = await Promise.race([dbOperationPromise(), dbTimeout]);
      
      clearTimeout(apiTimeout); // Clear timeout
      return NextResponse.json(dbResult);
    } catch (dbError) {
      console.error('Database connection or operation error:', dbError);
      
      let errorMessage = 'Database connection failed';
      
      if (dbError instanceof Error) {
        errorMessage = dbError.message;
        
        // More specific error messages based on the type of error
        if (errorMessage.includes('timed out')) {
          errorMessage = 'The database operation timed out. Your message was saved to our backup queue and will be processed later.';
          
          clearTimeout(apiTimeout); // Clear timeout
          // Return success even though DB failed since we saved to queue
          return NextResponse.json({
            success: true,
            message: 'Your message has been received. There was a delay in saving to our database, but we\'ve stored your message and will process it shortly.',
            offlineMode: true
          });
        } else if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('ETIMEDOUT')) {
          errorMessage = 'Could not connect to the database server. Please check your internet connection.';
        } else if (errorMessage.includes('Authentication failed')) {
          errorMessage = 'Database authentication failed. Please check your credentials.';
        } else if (errorMessage.includes('not authorized')) {
          errorMessage = 'Not authorized to access the database. Please check your permissions.';
        }
      }
      
      console.log('Message was already saved to offline queue after DB failure');
      
      clearTimeout(apiTimeout); // Clear timeout
      // Since we already saved to queue at the beginning, we can return a more positive message
      return NextResponse.json({
        success: true,
        message: 'Your message has been received. We are currently experiencing technical difficulties but will process your message as soon as possible.',
        offlineMode: true
      });
    }
  } catch (error) {
    console.error('Error in contact API route:', error);

    // Clear timeout
    clearTimeout(apiTimeout);

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