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
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import NotFoundPage from './pages/public/NotFoundPage';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import FindParking from './pages/user/FindParking';
import ParkingDetails from './pages/user/ParkingDetails';
import BookingHistory from './pages/user/BookingHistory';
import Vehicles from './pages/user/Vehicles';
import UserProfile from './pages/user/UserProfile';
import Notifications from './pages/user/Notifications';
import CheckInCheckout from './pages/user/CheckInCheckout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageLocations from './pages/admin/ManageLocations';
import ManageSlots from './pages/admin/ManageSlots';
import ManageBookings from './pages/admin/ManageBookings';
import ManageUsers from './pages/admin/ManageUsers';

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
                  <Route path="/" element={<FindParking />} />
                  <Route path="/home" element={<LandingPage />} />
                  <Route path="/parking" element={<FindParking />} />
                  <Route path="/parking/:id" element={<ParkingDetails />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* User Flow Routes */}
                <Route element={<UserLayout />}>
                  <Route path="/user/dashboard" element={<FindParking />} />
                  <Route path="/user/bookings" element={<BookingHistory />} />
                  <Route path="/user/history" element={<BookingHistory />} />
                  <Route path="/user/vehicles" element={<Vehicles />} />
                  <Route path="/user/notifications" element={<Notifications />} />
                  <Route path="/user/profile" element={<UserProfile />} />
                  <Route path="/user/kiosk" element={<CheckInCheckout />} />
                </Route>

                {/* Admin Portal Routes */}
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/locations" element={<ManageLocations />} />
                  <Route path="/admin/slots" element={<ManageSlots />} />
                  <Route path="/admin/bookings" element={<ManageBookings />} />
                  <Route path="/admin/users" element={<ManageUsers />} />
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
