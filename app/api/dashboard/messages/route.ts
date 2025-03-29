import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Add a function to generate sample messages when database is not available
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
    const client = await clientPromise;
    const db = client.db();
    
    console.log('Connected to MongoDB, fetching messages...');
    
    // Test the connection with a ping
    await db.command({ ping: 1 });
    console.log('MongoDB connection verified with ping');
    
    const messages = await db
      .collection('messages')
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
    console.error('Error in dashboard messages API route:', error);
    
    // Return sample data in development mode or when configured to show fallbacks
    const isFallbackEnabled = process.env.NODE_ENV === 'development' || process.env.ENABLE_FALLBACKS === 'true';
    const sampleMessages = isFallbackEnabled ? getSampleMessages() : [];
    
    console.log(`Returning ${sampleMessages.length} sample messages as fallback`);
    
    return NextResponse.json({
      success: true,
      messages: sampleMessages,
      fallback: true,
      error: error instanceof Error ? error.message : 'Unknown error connecting to database'
    });
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
    const db = client.db();

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
    const db = client.db();

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