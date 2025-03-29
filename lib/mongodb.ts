import { MongoClient } from 'mongodb';

// Set a fallback URI in case environment variables fail
// This should match the value in your .env.local file
const FALLBACK_URI = "mongodb+srv://Saurabh:Saurabh%402000@datascience.no0i8st.mongodb.net/datascience";

// Connection state tracking
let lastConnectionAttempt = 0;
let connectionErrorCount = 0;
const RETRY_DELAY = 60000; // 1 minute before retrying after failures
const MAX_ERROR_COUNT = 5; // Consider connection dead after 5 failures

// Connection pool tracking to prevent excessive new client creations
let activeClientPromise: Promise<MongoClient> | null = null;
let lastClientCreationTime = 0;

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
  minPoolSize: 1, // Keep at least one connection in the pool
  serverSelectionTimeoutMS: 10000, // Reduced from 15000 to fail faster on unreachable servers
  socketTimeoutMS: 30000, // Reduced to detect network issues faster
  connectTimeoutMS: 10000, // Reduced to fail faster
  heartbeatFrequencyMS: 20000, // More frequent heartbeats to detect issues faster
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
    // Set a timeout for the ping operation
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Ping timed out')), 5000);
    });
    
    // Try to ping the database with a short timeout
    await Promise.race([
      testClient.db().command({ ping: 1 }), 
      timeoutPromise
    ]);
    
    console.log("MongoDB connection successful: Connected to the database!");
    // Reset error counters on successful connection
    connectionErrorCount = 0;
    return { success: true, message: "Connected to MongoDB successfully!" };
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    // Increment error counter
    connectionErrorCount++;
    return { 
      success: false, 
      message: "Failed to connect to MongoDB", 
      error: error instanceof Error ? error.message : String(error),
      errorCount: connectionErrorCount
    };
  }
}

// Create a safe connect function that handles different error scenarios
const safeConnect = async (mongoClient: MongoClient, connectionUri: string): Promise<MongoClient> => {
  // Check if we have a recent client promise we can reuse
  const now = Date.now();
  if (activeClientPromise && (now - lastClientCreationTime) < 30000) {
    console.log('Reusing recent MongoDB client promise');
    return activeClientPromise;
  }
  
  // Check if we should delay retry based on previous failures
  if (connectionErrorCount > 0 && (now - lastConnectionAttempt) < RETRY_DELAY) {
    console.log(`Skipping MongoDB connection attempt - waiting for retry delay (${Math.round((RETRY_DELAY - (now - lastConnectionAttempt)) / 1000)}s remaining)`);
    // Return the existing client which will fail gracefully when used
    return mongoClient;
  }
  
  lastConnectionAttempt = now;
  lastClientCreationTime = now;
  
  // Create a promise that will time out if connection takes too long
  const connectWithTimeout = async () => {
    const timeoutPromise = new Promise<MongoClient>((_, reject) => {
      setTimeout(() => reject(new Error('Connection timeout')), 10000);
    });
    
    try {
      console.log('Attempting MongoDB connection...');
      return await Promise.race([mongoClient.connect(), timeoutPromise]);
    } catch (err) {
      console.error('Connection attempt timed out or failed:', err);
      throw err;
    }
  };
  
  try {
    const client = await connectWithTimeout();
    connectionErrorCount = 0; // Reset error count on success
    console.log('MongoDB connection established successfully');
    
    // Store this promise for potential reuse
    activeClientPromise = Promise.resolve(client);
    
    return client;
  } catch (err) {
    console.error('Initial MongoDB connection failed:', err);
    connectionErrorCount++;
    
    // Try with simplified URI format if there are query parameters
    if (connectionUri.includes('?')) {
      try {
        console.log('Trying simplified URI format without query parameters');
        const simplifiedUri = connectionUri.split('?')[0];
        const retryClient = new MongoClient(simplifiedUri, options);
        
        // Try the simplified connection with timeout
        const timeoutPromise = new Promise<MongoClient>((_, reject) => {
          setTimeout(() => reject(new Error('Simplified connection timeout')), 10000);
        });
        
        const client = await Promise.race([retryClient.connect(), timeoutPromise]);
        connectionErrorCount = 0; // Reset error count on success
        console.log('MongoDB connection established with simplified URI');
        
        // Store this promise for potential reuse
        activeClientPromise = Promise.resolve(client);
        
        return client;
      } catch (retryErr) {
        console.error('Retry with simplified URI also failed:', retryErr);
        connectionErrorCount++;
      }
    }
    
    // If we've reached here, all connection attempts have failed
    console.error(`All MongoDB connection attempts failed (attempt #${connectionErrorCount})`);
    // We'll return the client and handle the errors at the operation level
    return mongoClient;
  }
};

// Helper function to check if connection is likely to be in a failed state
export function isConnectionLikelyFailed(): boolean {
  if (connectionErrorCount >= MAX_ERROR_COUNT) {
    return true;
  }
  
  // Also consider failed if we've been waiting too long for retry
  const now = Date.now();
  if (connectionErrorCount > 0 && (now - lastConnectionAttempt) < RETRY_DELAY) {
    return true;
  }
  
  return false;
}

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
    // If we've had too many errors, immediately reject
    if (isConnectionLikelyFailed()) {
      throw new Error('MongoDB connection is in a failed state after multiple attempts');
    }
    
    // Set a timeout for getting the client
    const timeoutPromise = new Promise<MongoClient>((_, reject) => {
      setTimeout(() => reject(new Error('Client retrieval timeout')), 5000);
    });
    
    const client = await Promise.race([clientPromise, timeoutPromise]);
    
    // Test the connection is actually working with a quick timeout
    const pingTimeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Ping operation timed out')), 5000);
    });
    
    await Promise.race([client.db().command({ ping: 1 }), pingTimeoutPromise]);
    
    return client;
  } catch (error) {
    console.error("Error getting MongoDB client:", error);
    throw new Error(`MongoDB connection failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export default clientPromise; 