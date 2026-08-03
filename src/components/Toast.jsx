import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ type = 'info', title, message, onClose }) => {
  const getConfig = () => {
    switch (type) {
      case 'success':
        return { icon: CheckCircle2, border: '#22C55E', iconColor: '#22C55E', bg: '#F0FDF4' };
      case 'danger':
        return { icon: AlertCircle, border: '#EF4444', iconColor: '#EF4444', bg: '#FEF2F2' };
      case 'warning':
        return { icon: AlertTriangle, border: '#F59E0B', iconColor: '#F59E0B', bg: '#FFFBEB' };
      case 'info':
      default:
        return { icon: Info, border: '#2563EB', iconColor: '#2563EB', bg: '#EFF6FF' };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      backgroundColor: '#FFFFFF',
      borderRadius: 'var(--radius-md)',
      padding: '0.85rem 1rem',
      borderLeft: `4px solid ${config.border}`,
      boxShadow: 'var(--shadow-lg)',
      animation: 'slideInRight 0.25s ease-out',
      position: 'relative'
    }}>
      <div style={{ color: config.iconColor, marginTop: '2px' }}>
        <Icon size={20} />
      </div>

      <div style={{ flex: 1, paddingRight: '1rem' }}>
        {title && <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{title}</h5>}
        {message && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>{message}</p>}
      </div>

      <button
        onClick={onClose}
        style={{
          color: 'var(--text-muted)',
          padding: '2px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center'
        }}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
