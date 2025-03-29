import { NextResponse } from 'next/server';
import clientPromise, { testConnection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// We'll keep this function in case we need it in the future,
// but we won't use it by default anymore
function getSampleMessages() {
  return [
    {
      _id: "sample1", 
      name: "John Sample",
      email: "john@example.com",
      phone: "555-123-4567",
      subject: "Product Inquiry",
      message: "I'm interested in learning more about your services. Can you provide additional information?",
      status: "unread",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
    },
    {
      _id: "sample2",
      name: "Jane Demo", 
      email: "jane@example.com",
      phone: "555-987-6543",
      subject: "Consultation Request",
      message: "Hello, I'd like to schedule a consultation about a potential project. What's your availability?",
      status: "read",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
    },
    {
      _id: "sample3",
      name: "Robert Test",
      email: "robert@example.com",
      phone: "555-456-7890",
      subject: "Feedback",
      message: "I just wanted to say that your website looks great! Very professional and easy to navigate.",
      status: "unread",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // 2 days ago
    }
  ];
}

export async function GET() {
  try {
    console.log('Starting GET request to /api/dashboard/messages');
    
    // First, explicitly test the MongoDB connection
    console.log('Testing MongoDB connection...');
    const connectionTest = await testConnection();
    if (!connectionTest.success) {
      console.error('MongoDB connection test failed:', connectionTest.error);
      throw new Error(`Connection test failed: ${connectionTest.error}`);
    }
    
    console.log('Connection test successful, proceeding to get client');
    const client = await clientPromise;
    
    // Explicitly select the database and log it
    console.log('Getting database reference');
    const dbName = 'datascience'; // Explicitly specify database name
    console.log(`Using database: ${dbName}`);
    const db = client.db(dbName);
    
    console.log('Connected to MongoDB, fetching messages...');
    
    // Test the connection with a ping
    console.log('Pinging database to verify connection');
    await db.command({ ping: 1 });
    console.log('MongoDB connection verified with ping');
    
    // List all collections to help debug
    console.log('Listing collections in database');
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    // Use 'messages' collection
    const collectionName = 'messages';
    console.log(`Using collection: ${collectionName}`);
    
    const messages = await db
      .collection(collectionName)
      .find({})
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .toArray();
      
    console.log(`Successfully retrieved ${messages.length} messages from database`);

    return NextResponse.json({ 
      success: true, 
      messages: messages.map(msg => ({
        ...msg,
        _id: msg._id.toString()
      }))
    });
  } catch (error) {
    // Create detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    const errorName = error instanceof Error ? error.name : 'Error';
    
    console.error('Error in dashboard messages API route:', {
      name: errorName,
      message: errorMessage,
      stack: errorStack
    });
    
    // For development, return detailed error info
    const isDev = process.env.NODE_ENV === 'development';
    
    // If connection failed, return error instead of sample data
    return NextResponse.json({
      success: false,
      message: 'Failed to connect to database',
      error: errorMessage,
      ...isDev && { stack: errorStack, name: errorName }
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('datascience'); // Use the database from connection string

    const result = await db.collection('messages').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating message status:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update message status' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Message ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('datascience'); // Use the database from connection string

    const result = await db.collection('messages').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete message' },
      { status: 500 }
    );
  }
} 