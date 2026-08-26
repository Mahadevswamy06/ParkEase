import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, History, Bell, User } from 'lucide-react';
import { useParking } from '../../context/ParkingContext';

const MobileNav = () => {
  const { unreadNotifCount } = useParking();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Search', path: '/parking', icon: Search },
    { label: 'Bookings', path: '/user/bookings', icon: History },
    { label: 'Alerts', path: '/user/notifications', icon: Bell, badge: unreadNotifCount },
    { label: 'Profile', path: '/user/profile', icon: User }
  ];

  return (
    <nav className="mobile-bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      display: 'none',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0.5rem 0.25rem',
      zIndex: 1000,
      boxShadow: 'var(--shadow-lg)'
    }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '0.725rem',
              fontWeight: isActive ? 700 : 500,
              textDecoration: 'none',
              position: 'relative'
            })}
          >
            <Icon size={20} />
            <span>{item.label}</span>
            {item.badge > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '12px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: 'var(--danger)',
                color: '#FFFFFF',
                fontSize: '0.65rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {item.badge}
              </span>
            )}
          </NavLink>
        );
      })}
      <style>{`
        @media (max-width: 768px) {
          .mobile-bottom-nav { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default MobileNav;
