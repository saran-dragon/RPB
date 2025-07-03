import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import ServiceArea from './pages/ServiceArea';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUpload from './pages/admin/AdminUpload';
import AdminMedia from './pages/admin/AdminMedia';
import AdminInquiries from './pages/admin/AdminInquiries';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Preloader from './components/Preloader'; // ✅ Import your custom preloader

function App() {
  const [isLoading, setIsLoading] = useState(true); // ✅ Track preloader status

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-light font-poppins overflow-hidden">
          {/* ✅ Preloader appears first */}
          <AnimatePresence>
            {isLoading && (
              <Preloader onComplete={() => setIsLoading(false)} />
            )}
          </AnimatePresence>

          {/* ✅ Main App shows after preloader is complete */}
          {!isLoading && (
            <>
              <Navbar />
              <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/service-area" element={<ServiceArea />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/admin" element={
                    <ProtectedRoute><AdminDashboard /></ProtectedRoute>
                  } />
                  <Route path="/admin/upload" element={
                    <ProtectedRoute><AdminUpload /></ProtectedRoute>
                  } />
                  <Route path="/admin/manage-media" element={
                    <ProtectedRoute><AdminMedia /></ProtectedRoute>
                  } />
                  <Route path="/admin/inquiries" element={
                    <ProtectedRoute><AdminInquiries /></ProtectedRoute>
                  } />
                </Routes>
              </motion.main>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
