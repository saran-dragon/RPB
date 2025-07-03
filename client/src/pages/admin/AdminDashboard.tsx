import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Image, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Calendar,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState({
    totalMedia: 0,
    totalInquiries: 0,
    thisMonthInquiries: 0,
    pendingInquiries: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const dashboardCards = [
    {
      title: 'Upload Media',
      description: 'Add new images and videos to the gallery',
      icon: Upload,
      link: '/admin/upload',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      title: 'Manage Media',
      description: 'View and manage uploaded content',
      icon: Image,
      link: '/admin/manage-media',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      badge: stats.totalMedia
    },
    {
      title: 'View Inquiries',
      description: 'Check customer inquiries and bookings',
      icon: MessageSquare,
      link: '/admin/inquiries',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      badge: stats.totalInquiries
    }
  ];

  const statCards = [
    {
      title: 'Total Media',
      value: stats.totalMedia,
      icon: Image,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Inquiries',
      value: stats.totalInquiries,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'This Month',
      value: stats.thisMonthInquiries,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Pending',
      value: stats.pendingInquiries,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-light pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-4"
          >
            <img 
              src="/logo_EL.jpg" 
              alt="Royal Play Basha Logo" 
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold text-primary">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Royal Play Basha Management Portal
              </p>
            </div>
          </motion.div>

          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link
                to={card.link}
                className={`block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${card.hoverColor} group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${card.color} text-white`}>
                    <card.icon className="h-8 w-8" />
                  </div>
                  {card.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {card.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-white">
                  {card.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-200">
                  {card.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/admin/upload"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="h-5 w-5 text-primary" />
              <span className="font-medium">Upload New Content</span>
            </Link>
            <Link
              to="/admin/inquiries"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="font-medium">Check New Inquiries</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;