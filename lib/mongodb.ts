import { MongoClient } from 'mongodb';

// Update connection string with better error handling and correct format
const FALLBACK_URI = "mongodb+srv://Saurabh:Saurabh2000%40@datascience.no0i8st.mongodb.net/datascience?retryWrites=true&w=majority&directConnection=true";

// Connection state tracking
let lastConnectionAttempt = 0;
let connectionErrorCount = 0;
let isConnecting = false;

// Debug mode - set to true to show detailed logs
const DEBUG = true;

const MAX_ERROR_COUNT = 5; // Consider connection dead after 5 failures
const RETRY_DELAY = 30000; // Wait 30 seconds before retrying after a connection failure

// Connection pool tracking to prevent excessive new client creations
let cachedClient: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// Check for MongoDB URI in various places, with fallback
function getConnectionString() {
  try {
    if (process.env.MONGODB_URI) {
      DEBUG && console.log('Using MONGODB_URI from process.env');
      const uri = process.env.MONGODB_URI;
      // Ensure the URI has the directConnection parameter
      if (!uri.includes('directConnection=')) {
        return uri + (uri.includes('?') ? '&' : '?') + 'directConnection=true';
      }
      return uri;
    }
    
    DEBUG && console.log('Using fallback MongoDB URI');
    return FALLBACK_URI;
  } catch (error) {
    console.error('Error getting MongoDB connection string:', error);
    return FALLBACK_URI;
  }
}

// Get connection options - use only officially supported options
function getConnectionOptions() {
  return {
    maxPoolSize: 10,
    minPoolSize: 5,
    retryWrites: true,
    w: 'majority' as const,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 30000,
    directConnection: true
  };
}

// A function to test if the MongoDB connection is working
export async function testConnection() {
  const uri = getConnectionString();
  try {
    DEBUG && console.log('Connection string being used:', uri);
    const client = new MongoClient(uri, getConnectionOptions());
    
    console.log('Testing MongoDB connection...');
    
    // Try to ping the database with a short timeout
    await client.db("admin").command({ ping: 1 });
    
    // Close the connection after the test
    await client.close();
    
    console.log("MongoDB connection successful: Connected to the database!");
    // Reset error counters on successful connection
    connectionErrorCount = 0;
    return { success: true, message: "Connected to MongoDB successfully!" };
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    // Increment error counter for tracking
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
  const now = Date.now();
  
  // Prevent duplicate connection attempts
  if (isConnecting) {
    DEBUG && console.log('Another connection attempt is already in progress');
    throw new Error('Connection attempt already in progress');
  }
  
  // Avoid repeated connection attempts in a short time
  if (connectionErrorCount > 0 && (now - lastConnectionAttempt) < RETRY_DELAY) {
    DEBUG && console.log(`Skipping MongoDB connection attempt - waiting for retry delay (${Math.round((RETRY_DELAY - (now - lastConnectionAttempt)) / 1000)}s remaining)`);
    throw new Error('Connection attempts rate limited');
  }
  
  // Mark that we're attempting a connection
  isConnecting = true;
  lastConnectionAttempt = now;
  
  try {
    // Create a promise that will time out if connection takes too long
    const connectWithTimeout = async () => {
      const timeoutPromise = new Promise<MongoClient>((_, reject) => {
        setTimeout(() => reject(new Error('Connection timeout')), 15000);
      });
      
      try {
        DEBUG && console.log('Attempting MongoDB connection with URI:', 
                            connectionUri.substring(0, connectionUri.indexOf('@') + 1) + '***');
        return await Promise.race([mongoClient.connect(), timeoutPromise]);
      } catch (err) {
        console.error('Connection attempt timed out or failed:', err);
        connectionErrorCount++;
        throw err;
      }
    };
    
    // Try to connect with timeout
    const client = await connectWithTimeout();
    connectionErrorCount = 0; // Reset error count on success
    console.log('MongoDB connection established successfully');
    
    // Set up connection monitoring
    client.on('close', () => {
      console.log('MongoDB connection closed');
      cachedClient = null;
      clientPromise = null;
    });
    
    client.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      cachedClient = null;
      clientPromise = null;
    });
    
    return client;
  } catch (err) {
    console.error('MongoDB connection failed. Complete error:', err);
    throw err;
  } finally {
    isConnecting = false;
  }
};

// Main function to get client
export default async function clientPromiseFn(): Promise<MongoClient> {
  try {
    const uri = getConnectionString();
    
    // If we already have a client or an in-progress connection, reuse it
    if (clientPromise) {
      DEBUG && console.log('Reusing existing client promise');
      return clientPromise;
    }
    
    // Create a new client if needed
    if (!cachedClient) {
      console.log('Creating new MongoDB client');
      const mongoClient = new MongoClient(uri, getConnectionOptions());
      
      // Store the connection promise
      clientPromise = safeConnect(mongoClient, uri);
      
      try {
        // Set cached client when connection succeeds
        cachedClient = await clientPromise;
        return cachedClient;
      } catch (error) {
        // Clear the promise if connection fails
        clientPromise = null;
        console.error('Failed to establish MongoDB connection:', error);
        throw error;
      }
    }
    
    // If we have a cached client, ensure it's connected
    try {
      DEBUG && console.log('Validating cached client connection');
      await cachedClient.db("admin").command({ ping: 1 });
      return cachedClient;
    } catch (error) {
      // If ping fails, reconnect
      console.log('Cached connection is stale, reconnecting...');
      cachedClient = null;
      clientPromise = null;
      return clientPromiseFn();
    }
  } catch (error) {
    console.error('Error getting MongoDB client:', error);
    throw new Error(`Database connection error: ${error instanceof Error ? error.message : String(error)}`);
  }
} 