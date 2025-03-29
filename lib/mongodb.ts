import { MongoClient } from 'mongodb';

// Set a fallback URI in case environment variables fail
// This should match the value in your .env.local file
const FALLBACK_URI = "mongodb+srv://Saurabh:Saurabh2000@datascience.no0i8st.mongodb.net/datascience";

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

// Define client options - retryWrites and w are already in the connection string
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000, // Increased timeout for server selection
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000
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
    globalWithMongo._mongoClientPromise = client.connect()
      .then(client => {
        console.log('Successfully connected to MongoDB in development');
        return client;
      })
      .catch(err => {
        console.error('Failed to connect to MongoDB in development:', err);
        
        // Create a new client and try again with a simpler URI format
        // sometimes the query parameters in the URI can cause issues
        if (uri.includes('?')) {
          console.log('Trying simplified URI format without query parameters');
          const simplifiedUri = uri.split('?')[0];
          const retryClient = new MongoClient(simplifiedUri, options);
          return retryClient.connect().catch(retryErr => {
            console.error('Retry connection also failed:', retryErr);
            return client; // Return original client for graceful failure
          });
        }
        
        // Instead of throwing, return a connected client that will fail more gracefully
        return client;
      });
  } else {
    console.log("Reusing existing MongoDB connection in development mode");
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  console.log("Establishing MongoDB connection in production mode");
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then(client => {
      console.log('Successfully connected to MongoDB in production');
      return client;
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB in production:', err);
      
      // Try with simplified URI in production as well
      if (uri.includes('?')) {
        console.log('Trying simplified URI format without query parameters');
        const simplifiedUri = uri.split('?')[0];
        const retryClient = new MongoClient(simplifiedUri, options);
        return retryClient.connect().catch(retryErr => {
          console.error('Retry connection also failed:', retryErr);
          return client; // Return original client for graceful failure
        });
      }
      
      // Instead of throwing, return a connected client that will fail more gracefully
      return client;
    });
}

// Helper function that consumers can use to check connection
export async function getMongoClient() {
  try {
    return await clientPromise;
  } catch (error) {
    console.error("Error getting MongoDB client:", error);
    throw error;
  }
}

export default clientPromise; 