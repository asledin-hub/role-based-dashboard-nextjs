import "server-only";
import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is not configured");
    }

    await mongoose.connect(uri);
  } catch (error) {
    console.error("Error occurred while connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
