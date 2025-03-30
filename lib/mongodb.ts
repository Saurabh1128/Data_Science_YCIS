import { MongoClient } from 'mongodb';

// Update connection string with better error handling
const FALLBACK_URI = "mongodb+srv://Saurabh:Saurabh%402000@datascience.no0i8st.mongodb.net/datascience";

// Connection state tracking
let lastConnectionAttempt = 0;
let connectionErrorCount = 0;
let isConnecting = false;

const MAX_ERROR_COUNT = 5; // Consider connection dead after 5 failures
const RETRY_DELAY = 30000; // Wait 30 seconds before retrying after a connection failure

// Connection pool tracking to prevent excessive new client creations
let cachedClient: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// Check for MongoDB URI in various places, with fallback
function getConnectionString() {
  try {
    if (process.env.MONGODB_URI) {
      console.log('Using MONGODB_URI from process.env');
      return process.env.MONGODB_URI;
    }
    
    console.log('Using fallback MongoDB URI');
    return FALLBACK_URI;
  } catch (error) {
    console.error('Error getting MongoDB connection string:', error);
    return FALLBACK_URI;
  }
}

// Get connection options
function getConnectionOptions() {
  return {
    maxPoolSize: 10,
    minPoolSize: 1, // Keep at least one connection in the pool
    maxIdleTimeMS: 120000, // Close idle connections after 2 minutes
    connectTimeoutMS: 15000, // 15 seconds timeout for connection
    socketTimeoutMS: 45000, // 45 seconds for socket timeout
    serverSelectionTimeoutMS: 15000, // 15 seconds to select a server
    heartbeatFrequencyMS: 10000, // Check server status every 10 seconds
    waitQueueTimeoutMS: 10000, // Wait 10 seconds in queue
    retryWrites: true,
    retryReads: true,
    w: 'majority' as const,
    // Enable keepAlive to prevent connection timeouts
    keepAlive: true,
    keepAliveInitialDelay: 30000, // 30 seconds
  };
}

// A function to test if the MongoDB connection is working
export async function testConnection() {
  const uri = getConnectionString();
  try {
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
    console.log('Another connection attempt is already in progress');
    throw new Error('Connection attempt already in progress');
  }
  
  // Avoid repeated connection attempts in a short time
  if (connectionErrorCount > 0 && (now - lastConnectionAttempt) < RETRY_DELAY) {
    console.log(`Skipping MongoDB connection attempt - waiting for retry delay (${Math.round((RETRY_DELAY - (now - lastConnectionAttempt)) / 1000)}s remaining)`);
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
        console.log('Attempting MongoDB connection...');
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
    console.error('MongoDB connection failed:', err);
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
        throw error;
      }
    }
    
    // If we have a cached client, ensure it's connected
    try {
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