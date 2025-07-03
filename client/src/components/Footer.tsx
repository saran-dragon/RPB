// import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo_1.png" 
                alt="Royal Play Basha Logo" 
                className="h-10 w-10 object-contain"
              />
              <div className="text-xl font-bold">Royal Play Basha</div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Professional wall painting services with artistic excellence. Transforming spaces with royal quality and craftsmanship since years.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-accent transition-colors">Services</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-accent transition-colors">Gallery</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-gray-300">+91 9704474549</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-gray-300">skeliyaz67@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-gray-300">Nellore, Andhra Pradesh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2025 Royal Play Basha. All rights reserved. | Designed with ❤️ for professional painting services.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
