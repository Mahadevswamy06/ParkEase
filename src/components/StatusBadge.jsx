import React from 'react';
import { getStatusBadgeVariant } from '../utils/formatters';

const StatusBadge = ({
  status,
  variant,
  size = 'md',
  dot = true,
  children,
  className = '',
  style = {}
}) => {
  const badgeVariant = variant || getStatusBadgeVariant(status);

  const getVariantStyles = () => {
    switch (badgeVariant) {
      case 'success':
        return { bg: 'var(--success-light)', color: '#15803D', border: '#BBF7D0', dot: '#22C55E' };
      case 'warning':
        return { bg: 'var(--warning-light)', color: '#B45309', border: '#FDE68A', dot: '#F59E0B' };
      case 'danger':
        return { bg: 'var(--danger-light)', color: '#B91C1C', border: '#FECACA', dot: '#EF4444' };
      case 'info':
        return { bg: '#F0F9FF', color: '#0369A1', border: '#BAE6FD', dot: '#0EA5E9' };
      case 'secondary':
      default:
        return { bg: '#F1F5F9', color: '#475569', border: '#E2E8F0', dot: '#94A3B8' };
    }
  };

  const vStyles = getVariantStyles();

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: size === 'sm' ? '0.2rem 0.6rem' : '0.3rem 0.8rem',
    fontSize: size === 'sm' ? '0.75rem' : '0.85rem',
    fontWeight: 600,
    borderRadius: '9999px',
    backgroundColor: vStyles.bg,
    color: vStyles.color,
    border: `1px solid ${vStyles.border}`,
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    ...style
  };

  const textLabel = children || status || 'Default';

  return (
    <span style={badgeStyle} className={`status-badge ${className}`}>
      {dot && (
        <span
          style={{
            width: size === 'sm' ? '6px' : '8px',
            height: size === 'sm' ? '6px' : '8px',
            borderRadius: '50%',
            backgroundColor: vStyles.dot,
            display: 'inline-block'
          }}
        />
      )}
      {textLabel}
    </span>
  );
};

export default StatusBadge;
