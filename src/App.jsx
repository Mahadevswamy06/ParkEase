import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ParkingProvider } from './context/ParkingContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import NotFoundPage from './pages/public/NotFoundPage';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import ParkingLocations from './pages/user/ParkingLocations';
import ParkingDetails from './pages/user/ParkingDetails';
import BookingHistory from './pages/user/BookingHistory';
import ProfilePage from './pages/user/ProfilePage';
import SettingsPage from './pages/user/SettingsPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageLocations from './pages/admin/ManageLocations';
import ManageSlots from './pages/admin/ManageSlots';
import ManageUsers from './pages/admin/ManageUsers';
import ManageBookings from './pages/admin/ManageBookings';
import ReportsPage from './pages/admin/ReportsPage';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <ParkingProvider>
              <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* User Dashboard & Reservation Routes */}
                <Route element={<UserLayout />}>
                  <Route path="/user/dashboard" element={<UserDashboard />} />
                  <Route path="/parking" element={<ParkingLocations />} />
                  <Route path="/parking/:id" element={<ParkingDetails />} />
                  <Route path="/user/bookings" element={<BookingHistory />} />
                  <Route path="/user/profile" element={<ProfilePage />} />
                  <Route path="/user/settings" element={<SettingsPage />} />
                </Route>

                {/* Admin Portal Routes */}
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/locations" element={<ManageLocations />} />
                  <Route path="/admin/slots" element={<ManageSlots />} />
                  <Route path="/admin/users" element={<ManageUsers />} />
                  <Route path="/admin/bookings" element={<ManageBookings />} />
                  <Route path="/admin/reports" element={<ReportsPage />} />
                </Route>

                {/* Catch-all 404 Route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ParkingProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
