import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, Search, User, LogOut, Shield, Sun, Moon, Bell, Sparkles, Menu, X } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useParking } from '../context/ParkingContext';

const Navbar = () => {
  const { isAuthenticated, currentUser, role, logout, setRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { unreadNotifCount } = useParking();
  const location = useLocation();
  const navigate = useNavigate();

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRoleSwitch = (e) => {
    const selected = e.target.value;
    setRole(selected);
    if (selected === 'admin') {
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
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'var(--primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.2rem',
            boxShadow: 'var(--shadow-xs)'
          }}>
            P
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            ParkEase<span style={{ color: 'var(--primary)' }}>.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          <Link
            to="/"
            style={{
              fontSize: '0.9rem',
              fontWeight: location.pathname === '/' ? 700 : 500,
              color: location.pathname === '/' ? 'var(--primary)' : 'var(--text-secondary)',
              textDecoration: 'none'
            }}
          >
            Home
          </Link>

          <Link
            to="/parking"
            style={{
              fontSize: '0.9rem',
              fontWeight: location.pathname === '/parking' ? 700 : 500,
              color: location.pathname === '/parking' ? 'var(--primary)' : 'var(--text-secondary)',
              textDecoration: 'none'
            }}
          >
            Find Parking
          </Link>

          {isAuthenticated && role === 'driver' && (
            <>
              <Link
                to="/user/dashboard"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: location.pathname === '/user/dashboard' ? 700 : 500,
                  color: location.pathname === '/user/dashboard' ? 'var(--primary)' : 'var(--text-secondary)',
                  textDecoration: 'none'
                }}
              >
                Dashboard
              </Link>

              <Link
                to="/user/bookings"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: location.pathname === '/user/bookings' ? 700 : 500,
                  color: location.pathname === '/user/bookings' ? 'var(--primary)' : 'var(--text-secondary)',
                  textDecoration: 'none'
                }}
              >
                My Bookings
              </Link>
            </>
          )}

          {isAuthenticated && role === 'admin' && (
            <Link
              to="/admin"
              style={{
                fontSize: '0.9rem',
                fontWeight: location.pathname.startsWith('/admin') ? 700 : 500,
                color: location.pathname.startsWith('/admin') ? 'var(--primary)' : 'var(--text-secondary)',
                textDecoration: 'none'
              }}
            >
              Admin Portal
            </Link>
          )}
        </nav>

        {/* Right Section Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Notification Bell Badge */}
          {isAuthenticated && (
            <Link
              to="/user/notifications"
              style={{
                position: 'relative',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text)',
                textDecoration: 'none'
              }}
            >
              <Bell size={18} />
              {unreadNotifCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--danger)',
                  color: '#FFFFFF',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--surface)'
                }}>
                  {unreadNotifCount}
                </span>
              )}
            </Link>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#2563EB" />}
          </button>

          {/* Role Switcher Pill */}
          {isAuthenticated && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              fontSize: '0.78rem'
            }}>
              <Sparkles size={12} color="var(--primary)" />
              <select
                value={role}
                onChange={handleRoleSwitch}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  outline: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <option value="driver" style={{ backgroundColor: 'var(--surface)', color: 'var(--text)' }}>Driver View</option>
                <option value="admin" style={{ backgroundColor: 'var(--surface)', color: 'var(--text)' }}>Admin View</option>
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
                  padding: 0
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
                  backgroundColor: 'var(--surface)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid var(--border)',
                  padding: '0.5rem',
                  zIndex: 1050,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}>
                  <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '0.25rem' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text)' }}>{currentUser?.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentUser?.email}</div>
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
                      fontSize: '0.85rem',
                      textDecoration: 'none'
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
