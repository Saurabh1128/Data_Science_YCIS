import { NextResponse } from 'next/server';
import clientPromise, { testConnection } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    const result = await testConnection();
    
    // Additional detailed testing if the basic connection works
    let detailedInfo = {};
    
    if (result.success) {
      console.log('Base MongoDB connection test successful, performing detailed tests');
      try {
        // Get client and test specific database and collection
        const client = await clientPromise;
        
        // Try accessing the specific database
        const dbName = 'datascience';
        const db = client.db(dbName);
        
        // List collections
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);
        
        // Check for the messages collection
        const hasMessagesCollection = collectionNames.includes('messages');
        
        // Try to count documents in the messages collection to verify read access
        let messageCount = 0;
        if (hasMessagesCollection) {
          messageCount = await db.collection('messages').countDocuments();
        }
        
        detailedInfo = {
          database: dbName,
          collections: collectionNames,
          hasMessagesCollection,
          messageCount,
          mongodbVersion: await db.command({ buildInfo: 1 }).then(info => info.version)
        };
        
        console.log('Detailed connection tests successful:', detailedInfo);
      } catch (detailsError) {
        console.error('Error during detailed tests:', detailsError);
        detailedInfo = {
          error: detailsError instanceof Error ? detailsError.message : 'Unknown error during detailed tests'
        };
      }
      
      return NextResponse.json({
        success: true,
        message: result.message,
        details: detailedInfo,
        timestamp: new Date().toISOString()
      });
    } else {
      console.error('MongoDB connection test failed:', result.error);
      return NextResponse.json({
        success: false,
        message: result.message,
        error: result.error,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in DB connection test API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      success: false,
      message: 'Error testing database connection',
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 