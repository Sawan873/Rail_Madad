import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/models/User.model.js';
import Complaint from './src/models/Complaint.model.js';
dotenv.config();

const test = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  try {
    const res = await Complaint.find({}).skip(NaN).limit(NaN);
    console.log("Returned:", res.length);
  } catch (e) {
    console.log("Error:", e.message);
  }
  process.exit(0);
}
test();
