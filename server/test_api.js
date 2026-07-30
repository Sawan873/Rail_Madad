import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const testApi = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await mongoose.connection.db.collection('users').findOne({ email: 'housekeeping@railmadad.com' });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  console.log("TOKEN:", token);
  
  const response = await fetch('http://localhost:8000/api/complaints/department-complaints', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
  process.exit(0);
}
testApi();
