import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/layout/MobileNav';

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {children || <Outlet />}
      </main>
      <MobileNav />
      {!hideFooter && <Footer />}
    </div>
  );
};

export default PublicLayout;
