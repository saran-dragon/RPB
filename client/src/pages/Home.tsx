import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Crown, Shield, Paintbrush, Home as HomeIcon, Building, Palette, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true });

  const services = [
    {
      icon: HomeIcon,
      title: 'Interior Painting',
      description: 'Transform your living spaces with premium interior painting services.',
      image: '/interor.jpg'
    },
    {
      icon: Building,
      title: 'Exterior Painting',
      description: 'Protect and beautify your property with weather-resistant exterior coatings.',
      image: '/exterior.jpg'
    },
    {
      icon: Palette,
      title: 'Commercial Painting',
      description: 'Professional painting solutions for offices, shops, and commercial spaces.',
      image: '/commercial2.webp'
    }
  ];

  // const testimonials = [
  //   {
  //     name: 'Rajesh Kumar',
  //     location: 'Nellore',
  //     rating: 5,
  //     comment: 'Excellent work! The team was professional and the finishing was perfect.'
  //   },
  //   {
  //     name: 'Priya Sharma',
  //     location: 'Gudur',
  //     rating: 5,
  //     comment: 'Amazing color consultation and flawless execution. Highly recommended!'
  //   },
  //   {
  //     name: 'Venkat Reddy',
  //     location: 'Naidupet',
  //     rating: 5,
  //     comment: 'Royal Play Basha transformed our office completely. Outstanding service!'
  //   }
  // ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center bg-gradient-to-br from-primary via-primary-light to-primary-dark">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="animate-float">
                <img 
                  src="/logo_1.png" 
                  alt="Royal Play Basha Logo" 
                  className="h-20 w-20 object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Royal Play Basha
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Professional Wall Painting Services
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
              Transform your spaces with our premium painting services. Quality craftsmanship, 
              artistic excellence, and professional results guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="bg-accent text-primary px-8 py-4 rounded-full font-semibold hover:bg-accent-light transition-all duration-200 transform hover:scale-105"
              >
                View Services
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-200 transform hover:scale-105"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose Royal Play Basha?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              With years of experience in the painting industry, we bring artistic excellence 
              and professional quality to every project. Our team is dedicated to transforming 
              your spaces with precision and care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Crown,
                title: 'Premium Quality',
                description: 'We use only the finest paints and materials for lasting results.'
              },
              {
                icon: Shield,
                title: 'Trust & Reliability',
                description: 'All our work comes with a satisfaction guarantee and warranty.'
              },
              {
                icon: Paintbrush,
                title: 'Expert Craftsmanship',
                description: 'Our skilled painters deliver precision and attention to detail.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-primary mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From residential to commercial spaces, we offer comprehensive painting solutions 
              tailored to your needs and preferences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <service.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center text-primary font-medium hover:text-primary-light transition-colors"
                  >
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Get in touch with us today for a free consultation and quote
            </p>
            <Link
              to="/contact"
              className="bg-accent text-primary px-8 py-4 rounded-full font-semibold hover:bg-accent-light transition-all duration-200 transform hover:scale-105 inline-block"
            >
              Get Free Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;