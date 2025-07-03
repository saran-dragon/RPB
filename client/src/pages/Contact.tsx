import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock,
  Upload, CheckCircle, AlertCircle
} from 'lucide-react';

interface SubmitStatus {
  type: 'success' | 'error';
  message: string;
}

interface FormDataType {
  fullName: string;
  phone: string;
  location: string;
  serviceType: string;
  message: string;
  image: File | null;
}

const Booking = () => {
  const [formData, setFormData] = useState<FormDataType>({
    fullName: '',
    phone: '',
    location: '',
    serviceType: '',
    message: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const serviceTypes = [
    'Interior Painting',
    'Exterior Painting',
    'Commercial Painting',
    'Wall Texture',
    'Decorative Finish',
    'Other',
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setSubmitStatus({
        type: 'error',
        message: 'Only image files are allowed (JPG, PNG, etc).',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSubmitStatus({
        type: 'error',
        message: 'Image size should be less than 5MB',
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      image: file,
    }));

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setImagePreview(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) formDataToSend.append(key, value as string | Blob);
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/booking`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Your booking has been submitted successfully! We will contact you shortly.',
        });

        setFormData({
          fullName: '',
          phone: '',
          location: '',
          serviceType: '',
          message: '',
          image: null,
        });
        setImagePreview(null);
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit booking. Please try again or call us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 9704474549',
      description: 'Call us for immediate assistance',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'skeliyaz67@gmail.com',
      description: 'Send us your queries anytime',
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Nellore, Andhra Pradesh',
      description: 'We serve Nellore and surrounding areas',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: 'Mon-Sat: 8AM-6PM',
      description: 'Sunday: 9AM-4PM',
    },
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Ready to transform your space? Get in touch with us for a free consultation and personalized quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <info.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">{info.title}</h3>
                <p className="text-primary font-medium mb-1">{info.details}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Get Your Free Quote
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-light p-8 rounded-xl shadow-lg space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Your area / city"
                />
              </div>
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <select
                  name="serviceType"
                  id="serviceType"
                  required
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select a service</option>
                  {serviceTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Describe your requirements"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors"
                >
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload an image of the area</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </label>
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                </div>
              )}
            </div>

            {submitStatus && (
              <div className={`p-4 rounded-lg flex items-center space-x-2 ${
                submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <span>{submitStatus.message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking'}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Booking;
