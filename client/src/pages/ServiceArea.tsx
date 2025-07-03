// import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceArea = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const serviceAreas = [
    {
      name: 'Nellore',
      description: 'Our main service area with comprehensive coverage',
      features: ['Same-day quotes', 'Emergency services', 'Free consultations'],
      image: '/exterior3.jpg'
    },
    {
      name: 'Gudur',
      description: 'Full residential and commercial painting services',
      features: ['Scheduled services', 'Project management', 'Quality assurance'],
      image: '/commercial2.webp'
    },
    {
      name: 'Naidupet',
      description: 'Specialized in both interior and exterior projects',
      features: ['Color consultation', 'Premium materials', 'Warranty included'],
      image: '/exterior.jpg'
    },
    {
      name: 'Sullurpet',
      description: 'Quality painting services for all property types',
      features: ['Flexible scheduling', 'Competitive pricing', 'Professional team'],
      image: '/interor.jpg'
    },
    {
      name: 'Kavali',
      description: 'Comprehensive painting solutions for homes and businesses',
      features: ['Modern techniques', 'Eco-friendly paints', 'Fast turnaround'],
      image: '/exterior2.jpg'
    },
    {
      name: 'Venkatagiri',
      description: 'Professional painting services with local expertise',
      features: ['Local knowledge', 'Trusted service', 'Community focused'],
      image: '/interior2.jpg'
    }
  ];

  const serviceInfo = [
    {
      icon: Clock,
      title: 'Service Hours',
      description: 'Monday - Saturday: 8:00 AM - 6:00 PM\nSunday: 9:00 AM - 4:00 PM'
    },
    {
      icon: Phone,
      title: 'Response Time',
      description: 'Same-day quotes within our service areas\nEmergency services available'
    },
    {
      icon: MapPin,
      title: 'Coverage Area',
      description: 'Primary service within 50km radius\nExtended services upon request'
    }
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Service Areas
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              We proudly serve Nellore and surrounding areas with professional painting services. 
              Find out if we service your location and get in touch for a free consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Info */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <info.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section ref={ref} className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Where We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our experienced team provides reliable painting services across these locations. 
              Each area receives the same high-quality service and attention to detail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-xl font-bold text-primary">
                      {area.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {area.description}
                  </p>
                  
                  <div className="space-y-2">
                    {area.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/*<section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Coverage Map
            </h2>
            <p className="text-lg text-gray-600">
              We serve a wide area around Nellore with reliable and professional painting services
            </p>
          </div>
          
          <div className="bg-light rounded-xl p-8 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Service Area Map
                  </h3>
                  <p className="text-gray-600">
                    Interactive map showing our service coverage area
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-center p-2 bg-white rounded-lg">
                    <MapPin className="h-4 w-4 text-primary mr-2" />
                    <span className="font-medium">{area.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>*/}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't See Your Area?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              We're always looking to expand our service areas. 
              Contact us to see if we can serve your location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-accent text-primary px-8 py-4 rounded-full font-semibold hover:bg-accent-light transition-all duration-200 transform hover:scale-105"
              >
                Contact Us
              </Link>
              <a
                href="tel:+919876543210"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-200 transform hover:scale-105"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceArea;
