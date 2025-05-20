import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import Video from '../models/Video.js';
import User from '../models/User.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Middleware xác thực
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Chưa đăng nhập' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token không hợp lệ' });
  }
}

// Upload video
router.post('/upload', auth, upload.single('video'), async (req, res) => {
  const { title } = req.body;
  const video = new Video({
    title,
    filename: req.file.filename,
    uploader: req.user.id
  });
  await video.save();
  res.json({ message: 'Upload thành công', video });
});

// Lấy danh sách video
router.get('/list', async (req, res) => {
  const videos = await Video.find().populate('uploader', 'username');
  res.json(videos);
});

export default router; 