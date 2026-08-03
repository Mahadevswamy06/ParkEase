import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--primary)',
          color: '#ffffff',
          border: '1px solid transparent',
        };
      case 'secondary':
        return {
          backgroundColor: '#F1F5F9',
          color: 'var(--text)',
          border: '1px solid var(--border)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--text)',
          border: '1px solid var(--border)',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--danger)',
          color: '#ffffff',
          border: '1px solid transparent',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid transparent',
        };
      case 'success':
        return {
          backgroundColor: 'var(--success)',
          color: '#ffffff',
          border: '1px solid transparent',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '0.4rem 0.85rem', fontSize: '0.85rem', height: '34px' };
      case 'lg':
        return { padding: '0.8rem 1.6rem', fontSize: '1.05rem', height: '50px' };
      case 'md':
      default:
        return { padding: '0.6rem 1.25rem', fontSize: '0.95rem', height: '42px' };
    }
  };

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: 'var(--radius-md)',
    fontWeight: '600',
    letterSpacing: '-0.01em',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.65 : 1,
    transition: 'var(--transition)',
    width: fullWidth ? '100%' : 'auto',
    whiteSpace: 'nowrap',
    boxShadow: variant === 'primary' ? '0 2px 4px rgba(37, 99, 235, 0.2)' : 'none',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={baseStyle}
      className={`btn-component ${className}`}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} style={{ animation: 'spin 1s linear infinite' }} />}
      {!loading && Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 15 : size === 'lg' ? 20 : 17} />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 15 : size === 'lg' ? 20 : 17} />}
    </button>
  );
};

export default Button;
