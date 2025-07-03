import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Booking {
  _id: string;
  fullName: string;
  phone: string;
  location: string;
  serviceType: string;
  message: string;
  image?: string;
  createdAt: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const token = localStorage.getItem('adminToken');
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const imageBaseURL = import.meta.env.VITE_API_URL;

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${baseURL}/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to fetch bookings.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await axios.delete(`${baseURL}/admin/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings();
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError('Failed to delete booking.');
    }
  };

  const formatDateTime = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString(); // e.g., "3/7/2025, 4:45:00 PM"
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-auto">
        <table className="w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Booked At</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td className="p-2 border">{b.fullName}</td>
                <td className="p-2 border">{b.phone}</td>
                <td className="p-2 border">{b.location}</td>
                <td className="p-2 border">{b.serviceType}</td>
                <td className="p-2 border">{b.message}</td>
                <td className="p-2 border text-center">
                  {b.image ? (
                    <img
                      src={`${imageBaseURL}${b.image}`}
                      alt="Booking"
                      className="h-12 w-12 object-cover rounded cursor-pointer"
                      onClick={() => setSelectedImage(`${imageBaseURL}${b.image}`)}
                    />
                  ) : (
                    <span className="text-sm text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="p-2 border text-sm text-gray-600">
                  {formatDateTime(b.createdAt)}
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-gray-500 py-6">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Zoom Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Zoomed Booking"
            className="max-w-full max-h-full rounded shadow-lg border-4 border-white"
          />
        </div>
      )}
    </div>
  );
};

export default Bookings;
