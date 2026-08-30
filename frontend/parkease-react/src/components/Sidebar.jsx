import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  History,
  Car,
  Bell,
  User,
  Settings,
  Layers,
  Users,
  FileText,
  BarChart3,
  LogOut,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useParking } from '../context/ParkingContext';

const Sidebar = ({ isAdminMode = false }) => {
  const { logout } = useAuth();
  const { unreadNotifCount } = useParking();
  const navigate = useNavigate();

  const driverLinks = [
    { label: 'Find Parking', path: '/parking', icon: Search },
    { label: 'My Bookings', path: '/user/bookings', icon: Car },
    { label: 'Parking History', path: '/user/history', icon: History },
    { label: 'Profile', path: '/user/profile', icon: User },
    { label: 'My Vehicles', path: '/user/vehicles', icon: Car },
    { label: 'Notifications', path: '/user/notifications', icon: Bell, badge: unreadNotifCount }
  ];

  const adminLinks = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Parking Locations', path: '/admin/locations', icon: MapPin },
    { label: 'Live Slots', path: '/admin/slots', icon: Layers },
    { label: 'Bookings', path: '/admin/bookings', icon: FileText },
    { label: 'Users', path: '/admin/users', icon: Users }
  ];

  const navItems = isAdminMode ? adminLinks : driverLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside style={{
      width: '230px',
      backgroundColor: 'var(--sidebar-bg)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 65px)',
      padding: '1.25rem 0.85rem',
      flexShrink: 0
    }}>
      <div style={{
        fontSize: '0.7rem',
        fontWeight: 800,
        color: 'var(--text-muted)',
        padding: '0 0.5rem 0.75rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase'
      }}>
        {isAdminMode ? 'Admin Portal' : 'Driver Portal'}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin' || item.path === '/parking'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                textDecoration: 'none',
                transition: 'var(--transition)'
              })}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="badge badge-danger" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.85rem' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.6rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
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
