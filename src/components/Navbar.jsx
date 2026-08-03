import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Car,
  Search,
  User,
  Shield,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Sparkles,
  MapPin
} from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, role: authRole, isAuthenticated, switchRole, logout } = useAuth();
  const role = authRole || currentUser?.role || 'user';
  const { theme = 'light', toggleTheme = () => {} } = useTheme() || {};
  const { addToast } = useToast();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleRoleChange = (newRole) => {
    switchRole(newRole);
    setRoleDropdownOpen(false);
    setMobileMenuOpen(false);
    addToast(`Switched active role to ${newRole.toUpperCase()}`, 'info', 'Role Switcher');
    if (newRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user/dashboard');
    }
  };

  const handleLogout = () => {
    logout();
    addToast('You have been signed out.', 'info');
    navigate('/login');
  };

  return (
    <header className="sticky-header">
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Car size={22} />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              ParkEase <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '0.15rem 0.4rem', borderRadius: '4px', textTransform: 'uppercase', border: '1px solid var(--primary-border)' }}>India</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          <Link
            to="/parking"
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: location.pathname === '/parking' ? 'var(--primary)' : 'var(--text-secondary)',
              transition: 'var(--transition)'
            }}
          >
            Find Parking
          </Link>
          <Link
            to="/about"
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: location.pathname === '/about' ? 'var(--primary)' : 'var(--text-secondary)',
              transition: 'var(--transition)'
            }}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: location.pathname === '/contact' ? 'var(--primary)' : 'var(--text-secondary)',
              transition: 'var(--transition)'
            }}
          >
            Contact
          </Link>

          {/* Role Dashboard Quick Links if Logged in */}
          {isAuthenticated && role === 'user' && (
            <>
              <Link
                to="/user/dashboard"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: location.pathname === '/user/dashboard' ? 'var(--primary)' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                My Dashboard
              </Link>
              <Link
                to="/user/profile"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: location.pathname === '/user/profile' ? 'var(--primary)' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <User size={16} /> My Profile
              </Link>
            </>
          )}

          {isAuthenticated && role === 'admin' && (
            <Link
              to="/admin"
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: location.pathname.startsWith('/admin') ? 'var(--primary)' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Shield size={16} /> Admin Portal
            </Link>
          )}
        </nav>

        {/* Right Actions: Dark Mode Toggle, Role Switcher (When Logged In), Auth Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Dark Mode Toggle Switcher */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="#F59E0B" />}
          </button>

          {/* ROLE SWITCHER DROPDOWN — SHOWN ONLY WHEN LOGGED IN */}
          {isAuthenticated && (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--primary-border)',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <Sparkles size={14} />
                <span>Role: {role.toUpperCase()}</span>
                <ChevronDown size={14} />
              </button>

              {roleDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '190px',
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border)',
                  padding: '0.5rem',
                  zIndex: 1050,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', padding: '0.3rem 0.5rem', textTransform: 'uppercase' }}>
                    Switch Demo Role
                  </div>
                  <button
                    onClick={() => handleRoleChange('user')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      backgroundColor: role === 'user' ? 'var(--primary-light)' : 'transparent',
                      color: role === 'user' ? 'var(--primary)' : 'var(--text)',
                      fontWeight: role === 'user' ? 700 : 500,
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <User size={15} /> Driver (User)
                  </button>
                  <button
                    onClick={() => handleRoleChange('admin')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      backgroundColor: role === 'admin' ? 'var(--primary-light)' : 'transparent',
                      color: role === 'admin' ? 'var(--primary)' : 'var(--text)',
                      fontWeight: role === 'admin' ? 700 : 500,
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <Shield size={15} /> Administrator
                  </button>
                </div>
              )}
            </div>
          )}

          {/* User Auth Buttons or User Avatar Menu */}
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
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }}
                />
              </button>

              {userMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '210px',
                  backgroundColor: 'var(--card-bg)',
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
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Register</Button>
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
