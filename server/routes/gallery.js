// routes/gallery.js
import express from 'express';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// Public: Get all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch gallery.' });
  }
});

export default router;
