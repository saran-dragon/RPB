import React, { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  createdAt: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [category, setCategory] = useState<string>('interior');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const token = localStorage.getItem('adminToken');
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Use public /gallery GET route (not protected)
  const fetchImages = async () => {
    try {
      const res = await axios.get(`${baseURL}/gallery`);
      setImages(res.data);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('title', category);
    formData.append('category', category);
    formData.append('image', file);

    setLoading(true);
    try {
      await axios.post(`${baseURL}/admin/gallery`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchImages();
      setFile(null);
      setSuccessMsg('Image uploaded!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await axios.delete(`${baseURL}/admin/gallery/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchImages();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gallery Management</h2>

      {successMsg && (
        <div className="text-green-600 mb-4 text-center">{successMsg}</div>
      )}

      <form onSubmit={handleUpload} className="mb-8 space-y-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="interior">Interior</option>
          <option value="exterior">Exterior</option>
          <option value="commercial">Commercial</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFile(e.target.files?.[0] || null)
          }
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative group">
            <img
  src={`${import.meta.env.VITE_API_URL}${img.image}`}  // not BASE_URL
  alt={img.title}
  className="w-full h-40 object-cover rounded shadow"
/>
            <button
              type="button"
              onClick={() => handleDelete(img._id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
            <p className="text-center text-sm capitalize mt-1">{img.title}</p>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center text-gray-500 mt-6">
          No images uploaded yet.
        </div>
      )}
    </div>
  );
};

export default Gallery;
