import { MongoClient } from 'mongodb';

// Set a fallback URI in case environment variables fail
// This should match the value in your .env.production file
const FALLBACK_URI = "mongodb+srv://Saurabh:Saurabh2000%40@datascience.no0i8st.mongodb.net/datascience";

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
console.log('MongoDB connection string starts with:', uri.substring(0, 20) + '...');

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect()
      .then(client => {
        console.log('Successfully connected to MongoDB in development');
        return client;
      })
      .catch(err => {
        console.error('Failed to connect to MongoDB in development:', err);
        throw err;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then(client => {
      console.log('Successfully connected to MongoDB in production');
      return client;
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB in production:', err);
      throw err;
    });
}

export default clientPromise; 