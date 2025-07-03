import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [filter, setFilter] = useState('All');

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Interior', value: 'Interior' },
    { label: 'Exterior', value: 'Exterior' },
    { label: 'Commercial', value: 'Commercial' }
  ];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/gallery`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setFilteredImages(data);
      })
      .catch((err) => console.error('Error fetching gallery:', err));
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredImages(images);
    } else {
      setFilteredImages(
        images.filter((img) =>
          img.title?.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  }, [filter, images]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Gallery
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Explore our portfolio of completed projects showcasing our craftsmanship 
              and attention to detail across residential and commercial properties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  filter === option.value
                    ? 'bg-primary text-white'
                    : 'bg-light text-gray-700 hover:bg-accent hover:text-primary'
                }`}
              >
                <Filter className="h-4 w-4 inline mr-2" />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          >
            {filteredImages.map((img, index) => (
              <motion.div
                key={img._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}${img.image}`}
                  alt={img.title}
                  className="w-full h-48 object-cover"
                />
                {/* {img.title && (
                  <p className="text-center text-gray-700 py-2 text-sm font-medium capitalize">
                    {img.title}
                  </p>
                )} */}
              </motion.div>
            ))}
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No items found for the selected filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
