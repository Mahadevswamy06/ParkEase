import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Car,
  Search,
  User,
  LogOut,
  Shield,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isAuthenticated, currentUser, role, logout, setRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setRole(newRole);
    if (newRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user/dashboard');
    }
  };

  return (
    <header className="sticky-header">
      <div style={{
        maxWidth: '1380px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--gradient-primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.35rem',
            boxShadow: 'var(--gradient-glow)'
          }}>
            P
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            ParkEase<span style={{ color: 'var(--primary)', marginLeft: '2px' }}>.</span>
          </span>
        </Link>

        {/* Rearranged Desktop Navigation Links (How It Works & About Us removed from Header) */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          <Link
            to="/"
            className={`nav-link-hover ${location.pathname === '/' ? 'active' : ''}`}
            style={{ fontSize: '0.925rem', fontWeight: 600 }}
          >
            Home
          </Link>

          <Link
            to="/parking"
            className={`nav-link-hover ${location.pathname === '/parking' ? 'active' : ''}`}
            style={{ fontSize: '0.925rem', fontWeight: 600 }}
          >
            Find Parking
          </Link>

          <Link
            to="/contact"
            className={`nav-link-hover ${location.pathname === '/contact' ? 'active' : ''}`}
            style={{ fontSize: '0.925rem', fontWeight: 600 }}
          >
            Contact
          </Link>

          {/* Logged in Quick Links */}
          {isAuthenticated && role === 'user' && (
            <>
              <Link
                to="/user/dashboard"
                className={`nav-link-hover ${location.pathname === '/user/dashboard' ? 'active' : ''}`}
                style={{ fontSize: '0.925rem', fontWeight: 600 }}
              >
                Dashboard
              </Link>
              <Link
                to="/user/profile"
                className={`nav-link-hover ${location.pathname === '/user/profile' ? 'active' : ''}`}
                style={{ fontSize: '0.925rem', fontWeight: 600 }}
              >
                Profile
              </Link>
            </>
          )}

          {isAuthenticated && role === 'admin' && (
            <Link
              to="/admin"
              className={`nav-link-hover ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
              style={{ fontSize: '0.925rem', fontWeight: 600 }}
            >
              Admin Portal
            </Link>
          )}
        </nav>

        {/* Right Section Actions: Role Switcher, Theme Toggle & Auth Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--card-bg-solid)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Role Switcher Pill */}
          {isAuthenticated && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--card-bg-solid)',
              border: '1px solid var(--border)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              fontWeight: 600
            }}>
              <Sparkles size={13} color="var(--primary)" />
              <select
                value={role}
                onChange={handleRoleChange}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="user" style={{ background: 'var(--card-bg-solid)', color: 'var(--text)' }}>Role: USER</option>
                <option value="admin" style={{ background: 'var(--card-bg-solid)', color: 'var(--text)' }}>Role: ADMIN</option>
              </select>
            </div>
          )}

          {/* Auth Action Buttons or User Avatar */}
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '2px'
                }}
              >
                <img
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                  alt={currentUser?.name}
                  style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
                />
              </button>

              {userMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '210px',
                  backgroundColor: 'var(--card-bg-solid)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border)',
                  padding: '0.5rem',
                  zIndex: 1050,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}>
                  <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '0.25rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{currentUser?.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{currentUser?.email}</div>
                  </div>
                  <Link
                    to="/user/profile"
                    onClick={() => setUserMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <User size={15} /> My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: 'var(--danger)',
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Link to="/login">
                <Button variant="outline" size="sm" style={{ borderRadius: '9999px', padding: '0.45rem 1.25rem' }}>
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <button className="btn-gradient" style={{ padding: '0.5rem 1.35rem', borderRadius: '9999px', fontSize: '0.875rem', cursor: 'pointer' }}>
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
