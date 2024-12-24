import mongoose from "mongoose";
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@movieflix.1gjj1.mongodb.net/?retryWrites=true&w=majority&appName=MovieFlix`;
if (!uri) {
  throw new Error("Please define the MONGO_URI environment variable in .env.local");
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { connection: null, promise: null };
}

export async function connectMongoDB() {
    if (cached.connection) {
        console.log("Reusing existing MongoDB connection.");
        return cached.connection;
    }

    if (!cached.promise) {
        const options = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise =mongoose.connect(uri, options).then((mongoose) => {
            console.log("Connected to MongoDB successfully.");
            return mongoose;
        });
    }

    cached.connection = await cached.promise;
    return cached.connection;
}