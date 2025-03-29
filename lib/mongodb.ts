import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Select a server in 5 seconds instead of 30
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  retryWrites: true,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
};

let client;
let clientPromise: Promise<MongoClient>;

// Function to connect with error handling
const connectToDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const newClient = new MongoClient(uri, options);
    return await newClient.connect();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = connectToDatabase();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  // Create a cached connection variable.
  let cachedClient: MongoClient | null = null;
  let cachedPromise: Promise<MongoClient> | null = null;

  if (!cachedPromise) {
    cachedPromise = connectToDatabase()
      .then(client => {
        cachedClient = client;
        return client;
      })
      .catch(err => {
        console.error('Failed to connect to MongoDB in production:', err);
        throw err;
      });
  }

  clientPromise = cachedPromise;
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise; 