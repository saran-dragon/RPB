// server.js
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// Setup
dotenv.config();
const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images (for uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(process.env.PORT || 5000, () =>
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
  );
})
.catch((err) => console.error('❌ DB Error:', err));

// Routes
import bookingRoutes from './routes/bookingRoutes.js';
import galleryRoutes from './routes/gallery.js';      // Public: GET /api/gallery
import adminRoutes from './routes/admin.js';          // Admin: login, bookings, gallery upload/delete

app.use('/api/booking', bookingRoutes);               // User booking submission
app.use('/api/gallery', galleryRoutes);               // Public gallery
app.use('/api/admin', adminRoutes);                   // Admin protected routes
