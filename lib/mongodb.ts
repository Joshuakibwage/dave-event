import mongoose from 'mongoose';

// Define the connection cache type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Extend the global object to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;


// Initialize the cache on the global object to persist across hot reloads in development
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Caches the connection to prevent multiple connections during development hot reloads.
 * @returns Promise resolving to the Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Return existing connection promise if one is in progress
  if (!cached.promise) {
    // Enable mongoose debug logging in development to surface driver ops
    if (process.env.NODE_ENV === 'development') {
      try {
        mongoose.set('debug', true as any);
        // eslint-disable-next-line no-console
        console.log('Mongoose debug enabled');
      } catch (err) {
        // ignore
      }
    }
    // Validate MongoDB URI exists
    if (!MONGODB_URI) {
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
      );
    }
    const options = {
      bufferCommands: false, // Disable Mongoose buffering
      // Shorten server selection timeout to fail fast when DB is unreachable
      serverSelectionTimeoutMS: 5000,
      // Prefer IPv4 to avoid occasional DNS/IPv6 issues in some CI/dev hosts
      family: 4,
    } as const;

    // Create a new connection promise
    cached.promise = mongoose.connect(MONGODB_URI!, options).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Wait for the connection to establish
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise on error to allow retry
    cached.promise = null;
    // Provide a clearer error message in development
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('MongoDB connection error:', error);
    }
    throw error;
  }

  return cached.conn;
}

export default connectDB;