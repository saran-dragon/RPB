// import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Home, Building, Palette, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const services = [
    {
      icon: Home,
      title: 'Interior Painting',
      description: 'Transform your living spaces with our premium interior painting services. We specialize in residential homes, apartments, and indoor commercial spaces.',
      features: [
        'Premium quality paints',
        'Color consultation',
        'Wall preparation',
        'Furniture protection',
        'Clean-up included'
      ],
      gallery: [
        '/interor.jpg',
        '/interior2.jpg',
        '/interoir3.jpg'
      ]
    },
    {
      icon: Building,
      title: 'Exterior Painting',
      description: 'Protect and beautify your property with our weather-resistant exterior painting solutions. Perfect for homes, offices, and commercial buildings.',
      features: [
        'Weather-resistant coatings',
        'Surface preparation',
        'Waterproofing',
        'Long-lasting finish',
        'Property protection'
      ],
      gallery: [
        '/exterior.jpg',
        '/exterior2.jpg',
        '/exterior3.jpg'
      ]
    },
    {
      icon: Palette,
      title: 'Commercial Painting',
      description: 'Professional painting solutions for offices, retail spaces, restaurants, and commercial establishments. We work around your business schedule.',
      features: [
        'Flexible scheduling',
        'Minimal disruption',
        'Professional finish',
        'Brand color matching',
        'Quick turnaround'
      ],
      gallery: [
        '/commercial2.webp',
        'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    }
  ];

  const additionalServices = [
    'Wall texture painting',
    'Decorative finishes',
    'Pressure washing',
    'Minor repairs',
    'Color consultation',
    'Touch-up services'
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
              Our Services
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Professional painting services for residential and commercial properties. 
              Quality craftsmanship with attention to detail in every project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section ref={ref} className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <service.icon className="h-12 w-12 text-primary mb-6" />
                    <h2 className="text-3xl font-bold text-primary mb-4">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <h3 className="text-xl font-semibold text-primary mb-4">
                      What's Included:
                    </h3>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to="/gallery"
                      className="inline-flex items-center text-primary font-medium hover:text-primary-light transition-colors"
                    >
                      See Examples <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="grid grid-cols-2 gap-4">
                    {service.gallery.map((image, imageIndex) => (
                      <motion.div
                        key={imageIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: (index * 0.2) + (imageIndex * 0.1) }}
                        className={`rounded-lg overflow-hidden shadow-lg ${
                          imageIndex === 0 ? 'col-span-2' : ''
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${service.title} example ${imageIndex + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We also offer specialized services to meet all your painting and finishing needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-light p-6 rounded-lg border-l-4 border-primary hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-accent mr-3" />
                  <span className="font-medium text-gray-800">{service}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Contact us today for a free consultation and personalized quote for your project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-accent text-primary px-8 py-4 rounded-full font-semibold hover:bg-accent-light transition-all duration-200 transform hover:scale-105"
              >
                Get Free Quote
              </Link>
              <Link
                to="/gallery"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-200 transform hover:scale-105"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
