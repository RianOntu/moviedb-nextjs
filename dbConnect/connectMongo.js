import mongoose from "mongoose";
export async function connectMongoDB() {
  const cached = {};
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local"
    );
  }
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }
  try {
    cached.connection = await cached.promise;
    console.log(`Connection to MongoDB Success`);
  } catch (error) {
    cached.promise = undefined;
    console.log(` ${error} Connection Failed: Mongodb connection failed`);
  }
  return cached.connection;
}
