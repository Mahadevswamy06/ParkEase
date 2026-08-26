import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import MobileNav from '../components/layout/MobileNav';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      <Navbar />
      <div className="layout-with-sidebar">
        <Sidebar isAdminMode={true} />
        <div className="sidebar-main-wrapper">
          <main className="main-content page-body">
            {children || <Outlet />}
          </main>
        </div>
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
};

export default AdminLayout;
