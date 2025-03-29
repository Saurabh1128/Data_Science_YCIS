import { MongoClient } from 'mongodb';

// Set a fallback URI in case environment variables fail
// This should match the value in your .env.local file
const FALLBACK_URI = "mongodb+srv://Saurabh:Saurabh%402000@datascience.no0i8st.mongodb.net/datascience";

// Check for MongoDB URI in various places, with fallback
const getMongoURI = () => {
  // For Vercel deployment
  if (process.env.MONGODB_URI) {
    console.log('Using MONGODB_URI from process.env');
    return process.env.MONGODB_URI;
  }
  
  // Fallback to hardcoded value as last resort
  console.log('Using fallback MongoDB URI');
  return FALLBACK_URI;
};

const uri = getMongoURI();
console.log('MongoDB connection string detected:', uri.substring(0, 20) + '...');

// Define client options with more forgiving settings
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 15000, // Increased timeout for server selection
  socketTimeoutMS: 45000,
  connectTimeoutMS: 15000,
  retryWrites: true,
  retryReads: true,
  // w property should be typed correctly for MongoDB
  w: 'majority' as const // Use 'as const' to fix the type issue
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// A function to test if the MongoDB connection is working
export async function testConnection() {
  try {
    const testClient = await clientPromise;
    // Try to ping the database
    await testClient.db().command({ ping: 1 });
    console.log("MongoDB connection successful: Connected to the database!");
    return { success: true, message: "Connected to MongoDB successfully!" };
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    return { 
      success: false, 
      message: "Failed to connect to MongoDB", 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}

// Create a safe connect function that handles different error scenarios
const safeConnect = async (mongoClient: MongoClient, connectionUri: string): Promise<MongoClient> => {
  try {
    console.log('Attempting MongoDB connection...');
    return await mongoClient.connect();
  } catch (err) {
    console.error('Initial MongoDB connection failed:', err);
    
    // Try with simplified URI format if there are query parameters
    if (connectionUri.includes('?')) {
      try {
        console.log('Trying simplified URI format without query parameters');
        const simplifiedUri = connectionUri.split('?')[0];
        const retryClient = new MongoClient(simplifiedUri, options);
        return await retryClient.connect();
      } catch (retryErr) {
        console.error('Retry with simplified URI also failed:', retryErr);
      }
    }
    
    // If we've reached here, all connection attempts have failed
    // Return the client but mark it as having failed to connect
    console.error('All MongoDB connection attempts failed');
    // We'll return the client and handle the errors at the operation level
    return mongoClient;
  }
};

// Handle the connection in development or production mode
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    console.log("Establishing new MongoDB connection in development mode");
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = safeConnect(client, uri);
  } else {
    console.log("Reusing existing MongoDB connection in development mode");
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  console.log("Establishing MongoDB connection in production mode");
  client = new MongoClient(uri, options);
  clientPromise = safeConnect(client, uri);
}

// Helper function that consumers can use to check connection
export async function getMongoClient() {
  try {
    const client = await clientPromise;
    // Test the connection is actually working
    await client.db().command({ ping: 1 });
    return client;
  } catch (error) {
    console.error("Error getting MongoDB client:", error);
    throw new Error(`MongoDB connection failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export default clientPromise; 