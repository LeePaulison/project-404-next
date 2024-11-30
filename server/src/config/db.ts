import dotenv from "dotenv";
dotenv.config(); // This loads variables from .env into process.env

import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || "";

  if (!mongoURI) {
    console.error("❌ MongoDB URI not found in .env file");
    process.exit(1); // Exit process if URI is not defined
  }

  try {
    await mongoose.connect(mongoURI, {});
    console.log("🚀 MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit process if unable to connect
  }
};

export default connectDB;
