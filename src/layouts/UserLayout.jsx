import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const UserLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      <Navbar />
      <div className="layout-with-sidebar">
        <Sidebar isAdminMode={false} />
        <div className="sidebar-main-wrapper">
          <main className="main-content page-body animate-fade-in">
            {children || <Outlet />}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
