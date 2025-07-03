import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Bookings from './pages/Bookings.tsx';
import Gallery from './pages/Gallery';
import AdminNavbar from './components/AdminNavbar';
import PrivateRoute from './components/PrivateRoute.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin/bookings"
          element={
            <PrivateRoute>
              <>
                <AdminNavbar />
                <Bookings />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/gallery"
          element={
            <PrivateRoute>
              <>
                <AdminNavbar />
                <Gallery />
              </>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
