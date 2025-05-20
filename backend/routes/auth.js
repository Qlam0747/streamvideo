import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Đăng ký
router.post('/signup', async (req, res) => {
  try {
    const { username, password, email, birthday } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash, email, birthday });
    await user.save();
    res.json({ message: 'Đăng ký thành công' });
  } catch (err) {
    res.status(400).json({ error: 'Tài khoản hoặc email đã tồn tại' });
  }
});

// Đăng nhập
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Sai tài khoản hoặc mật khẩu' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Sai tài khoản hoặc mật khẩu' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { username: user.username, email: user.email, birthday: user.birthday } });
});

export default router; 