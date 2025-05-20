import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: String,
  filename: String,
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Video', videoSchema); 