// routes/bookingRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Booking from '../models/Booking.js';

const router = express.Router();

const uploadDir = 'uploads/bookings';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { fullName, phone, location, serviceType, message } = req.body;
    const image = req.file ? `/uploads/bookings/${req.file.filename}` : null;

    const newBooking = new Booking({
      fullName,
      phone,
      location,
      serviceType,
      message,
      image
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking submitted successfully.' });
  } catch (err) {
    console.error('Booking Error:', err);
    res.status(500).json({ message: 'Booking failed.', error: err.message });
  }
});

export default router;
