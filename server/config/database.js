import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI ||
      process.env.MONGODB_URI ||
      'mongodb://127.0.0.1:27017/restaurant';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw error;
  }
};

export default dbConnect;