import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Crown, Shield, Users, Award, Clock, Heart } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const values = [
    {
      icon: Crown,
      title: 'Quality Excellence',
      description: 'We never compromise on quality. Every project receives our full attention and commitment to excellence.'
    },
    {
      icon: Shield,
      title: 'Trust & Reliability',
      description: 'Our reputation is built on trust. We deliver on our promises and stand behind our work with confidence.'
    },
    {
      icon: Heart,
      title: 'Customer Satisfaction',
      description: 'Your satisfaction is our priority. We listen, understand, and deliver results that exceed expectations.'
    },
    {
      icon: Users,
      title: 'Professional Team',
      description: 'Our skilled craftsmen bring years of experience and passion to every painting project.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Projects Completed' },
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Happy Clients' },
    { number: '100%', label: 'Satisfaction Rate' }
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
              About Royal Play Basha
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Transforming spaces with artistic excellence and professional craftsmanship. 
              We're more than painters - we're artists who bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Royal Play Basha was founded with a simple yet powerful vision: to transform 
                  ordinary spaces into extraordinary environments through the art of painting. 
                  What started as a small local business has grown into a trusted name in the 
                  Nellore region.
                </p>
                <p>
                  Our journey began with a commitment to quality and customer satisfaction. 
                  Over the years, we've refined our techniques, upgraded our tools, and expanded 
                  our services, but our core values remain unchanged - excellence, integrity, 
                  and artistry in every brushstroke.
                </p>
                <p>
                  Today, we're proud to serve homeowners, businesses, and commercial establishments 
                  across Nellore and surrounding areas. Every project is an opportunity to showcase 
                  our craftsmanship and build lasting relationships with our clients.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Our team at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape our approach to every project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center p-6 bg-light rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-200">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-200">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our skilled professionals are the heart of Royal Play Basha. 
              Each team member brings expertise, creativity, and dedication to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold text-primary">Certified Professionals</h3>
                  <p className="text-gray-600">All team members are trained and certified in modern painting techniques</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold text-primary">Years of Experience</h3>
                  <p className="text-gray-600">Our team combines decades of collective experience in the painting industry</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold text-primary">Customer Focused</h3>
                  <p className="text-gray-600">We prioritize clear communication and customer satisfaction in every interaction</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/exterior4.jpg"
                  alt="Our professional team"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              To transform spaces and enhance lives through exceptional painting services. 
              We believe that a beautifully painted space has the power to inspire, comfort, 
              and elevate the human experience. Our mission is to bring this transformation 
              to every client, every project, and every community we serve.
            </p>
            <div className="flex justify-center">
              <div className="bg-light p-8 rounded-xl">
                <Crown className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary">
                  Royal Quality, Every Time
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;