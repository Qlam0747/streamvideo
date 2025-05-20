import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
  birthday: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema); 