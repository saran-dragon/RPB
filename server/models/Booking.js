import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  serviceType: { type: String, required: true },
  message: { type: String },
  image: { type: String }, // Stores uploaded image path
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);
