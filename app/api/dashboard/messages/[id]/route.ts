import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid message ID' },
        { status: 400 }
      );
    }
    
    // Parse request body
    const { status } = await request.json();
    
    // Validate status
    if (!status || !['unread', 'read', 'archived'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('datascience');
    const collection = db.collection('contactMessages');
    
    // Update the message status
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Message status updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update message',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`Attempting to delete message with ID: ${params.id}`);
  
  try {
    const { id } = params;
    
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      console.log(`Invalid message ID format: ${id}`);
      return NextResponse.json(
        { success: false, message: 'Invalid message ID' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    const db = client.db('datascience');
    
    // Try both possible collection names (messages and contactMessages)
    console.log('Checking for collection "messages"...');
    let collection = db.collection('messages');
    
    // Try to find the message first to confirm it exists
    const messageExists = await collection.findOne({ _id: new ObjectId(id) });
    
    // If not found in 'messages' collection, try 'contactMessages'
    if (!messageExists) {
      console.log('Message not found in "messages" collection, trying "contactMessages"...');
      collection = db.collection('contactMessages');
      const altMessageExists = await collection.findOne({ _id: new ObjectId(id) });
      
      if (!altMessageExists) {
        console.log(`Message with ID ${id} not found in any collection`);
        return NextResponse.json(
          { success: false, message: 'Message not found in any collection' },
          { status: 404 }
        );
      }
    }
    
    console.log(`Found message, proceeding with deletion...`);
    
    // Delete the message from the appropriate collection
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      console.log(`Delete operation completed but no document was deleted for ID: ${id}`);
      return NextResponse.json(
        { success: false, message: 'Message could not be deleted' },
        { status: 404 }
      );
    }
    
    console.log(`Successfully deleted message with ID: ${id}`);
    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting message:', error);
    
    // Create more specific error message
    let errorMessage = 'Failed to delete message';
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Handle specific MongoDB errors
      if (errorMessage.includes('connection')) {
        errorMessage = 'Database connection error. Please try again later.';
      } else if (errorMessage.includes('authentication')) {
        errorMessage = 'Database authentication failed. Please check credentials.';
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 