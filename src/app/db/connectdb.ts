import mongoose from "mongoose";

async function connectDb() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI as string);
  if (db) {
    console.log("Connected to MongoDB");
  } else {
    console.log("Failed to connect to MongoDB");
  }
}

export default connectDb;