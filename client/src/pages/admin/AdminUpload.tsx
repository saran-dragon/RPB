import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Image, 
  Video, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  X
} from 'lucide-react';

const AdminUpload = () => {
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: '',
    file: null
  });
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const categories = [
    'interior',
    'exterior', 
    'commercial'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        setUploadStatus({ 
          type: 'error', 
          message: 'Please select a valid image or video file' 
        });
        return;
      }

      // Validate file size
      const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024; // 50MB for video, 10MB for image
      if (file.size > maxSize) {
        setUploadStatus({ 
          type: 'error', 
          message: `File size should be less than ${isVideo ? '50MB' : '10MB'}` 
        });
        return;
      }

      // Validate video duration (if it's a video)
      if (isVideo) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        
        video.onloadedmetadata = () => {
          if (video.duration > 40) {
            setUploadStatus({ 
              type: 'error', 
              message: 'Video duration should be less than 40 seconds' 
            });
            return;
          }
          
          setUploadData(prev => ({ ...prev, file }));
          
          // Create preview
          const reader = new FileReader();
          reader.onload = (e) => {
            setFilePreview({ type: 'video', url: e.target.result });
          };
          reader.readAsDataURL(file);
        };
        
        video.src = URL.createObjectURL(file);
      } else {
        setUploadData(prev => ({ ...prev, file }));
        
        // Create preview for image
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview({ type: 'image', url: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeFile = () => {
    setUploadData(prev => ({ ...prev, file: null }));
    setFilePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('title', uploadData.title);
      formData.append('description', uploadData.description);
      formData.append('category', uploadData.category);
      formData.append('file', uploadData.file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData,
      });

      if (response.ok) {
        setUploadStatus({ 
          type: 'success', 
          message: 'Media uploaded successfully!' 
        });
        
        // Reset form
        setUploadData({
          title: '',
          description: '',
          category: '',
          file: null
        });
        setFilePreview(null);
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }
    } catch (error) {
      setUploadStatus({ 
        type: 'error', 
        message: error.message || 'Failed to upload media. Please try again.' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link
            to="/admin"
            className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-primary">Upload Media</h1>
            <p className="text-gray-600">Add new images and videos to the gallery</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={uploadData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Enter media title"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={uploadData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={uploadData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="Enter media description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File *
              </label>
              
              {!filePreview ? (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-600 mb-2">
                        Click to upload media
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        Images: JPG, PNG up to 10MB
                      </p>
                      <p className="text-sm text-gray-500">
                        Videos: MP4 up to 50MB, max 40 seconds
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="relative bg-gray-100 rounded-lg p-4">
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  {filePreview.type === 'image' ? (
                    <div className="flex items-center space-x-4">
                      <Image className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Image uploaded</p>
                        <img
                          src={filePreview.url}
                          alt="Preview"
                          className="mt-2 h-32 w-32 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <Video className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Video uploaded</p>
                        <video
                          src={filePreview.url}
                          controls
                          className="mt-2 h-32 w-48 rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {uploadStatus && (
              <div className={`p-4 rounded-lg flex items-center space-x-2 ${
                uploadStatus.type === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {uploadStatus.type === 'success' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <span>{uploadStatus.message}</span>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isUploading || !uploadData.file}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Upload Media'}
              </button>
              
              <Link
                to="/admin/manage-media"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
              >
                View Gallery
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUpload;