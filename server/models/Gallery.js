// models/Gallery.js
import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
