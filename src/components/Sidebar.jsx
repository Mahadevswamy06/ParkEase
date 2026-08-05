import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  History,
  User,
  Settings,
  Shield,
  Layers,
  Users,
  FileText,
  BarChart3,
  LogOut,
  HelpCircle,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isAdminMode = false }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const userLinks = [
    { label: 'Overview', path: '/user/dashboard', icon: LayoutDashboard },
    { label: 'Find Parking', path: '/parking', icon: MapPin },
    { label: 'Booking History', path: '/user/bookings', icon: History },
    { label: 'My Profile', path: '/user/profile', icon: User },
    { label: 'How It Works', path: '/#how-it-works', icon: HelpCircle },
    { label: 'About Us', path: '/about', icon: Info },
    { label: 'Settings', path: '/user/settings', icon: Settings },
  ];

  const adminLinks = [
    { label: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Manage Locations', path: '/admin/locations', icon: MapPin },
    { label: 'Manage Slots', path: '/admin/slots', icon: Layers },
    { label: 'Manage Users', path: '/admin/users', icon: Users },
    { label: 'Manage Bookings', path: '/admin/bookings', icon: FileText },
    { label: 'Analytics & Reports', path: '/admin/reports', icon: BarChart3 },
  ];

  const navItems = isAdminMode ? adminLinks : userLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--card-bg)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 70px)',
      padding: '1.25rem 1rem',
      gap: '1.5rem',
      flexShrink: 0
    }}>
      {/* Nav Menu */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
        <div style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          padding: '0 0.5rem 0.5rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          {isAdminMode ? 'Administration' : 'Driver Portal'}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin' || item.path === '/user/dashboard'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                transition: 'var(--transition)',
                textDecoration: 'none'
              })}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer / Exit */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--danger)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            transition: 'var(--transition)'
          }}
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
