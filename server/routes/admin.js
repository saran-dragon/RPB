// routes/admin.js
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import Booking from '../models/Booking.js';
import Gallery from '../models/Gallery.js';

dotenv.config();
const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// === Middleware ===
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') throw new Error();
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// === Multer Setup for Gallery Upload ===
const galleryDir = 'uploads/gallery';
if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, galleryDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const valid = ['.jpg', '.jpeg', '.png', '.webp'];
    cb(null, valid.includes(ext));
  }
});

// === Routes ===

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid admin credentials' });
});

// Bookings: Get All
router.get('/bookings', verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings.' });
  }
});

// Bookings: Delete
router.delete('/bookings/:id', verifyAdmin, async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete booking.' });
  }
});

// GALLERY: Upload (Admin only)
router.post('/gallery', verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const imagePath = `/uploads/gallery/${req.file.filename}`;
    const newImage = new Gallery({
      title: req.body.title || '',
      category: req.body.category || 'interior',
      image: imagePath
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// GALLERY: Delete (Admin only)
router.delete('/gallery/:id', verifyAdmin, async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    const filePath = `.${image.image}`;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete image.' });
  }
});

export default router;
