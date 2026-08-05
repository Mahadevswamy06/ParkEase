import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const UserLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isProfilePage = location.pathname === '/user/profile';

  return (
    <div className="app-container">
      <Navbar />
      <div className="layout-with-sidebar">
        {!isProfilePage && <Sidebar isAdminMode={false} />}
        <div className="sidebar-main-wrapper" style={{ width: '100%' }}>
          <main className="main-content page-body animate-fade-in" style={{ maxWidth: isProfilePage ? '100%' : '1400px', padding: isProfilePage ? '0' : '2rem 1.5rem' }}>
            {children || <Outlet />}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
