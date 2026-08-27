import React from 'react';

const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'danger', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  icon: Icon,
  className = '',
  style = {},
  ...props
}) => {
  let baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: 600,
    fontFamily: 'inherit',
    borderRadius: 'var(--radius-md)',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'var(--transition)',
    width: fullWidth ? '100%' : 'auto',
    border: 'none',
    outline: 'none',
    ...style
  };

  // Sizes
  if (size === 'sm') {
    baseStyle.padding = '0.4rem 0.85rem';
    baseStyle.fontSize = '0.8rem';
  } else if (size === 'lg') {
    baseStyle.padding = '0.75rem 1.5rem';
    baseStyle.fontSize = '1rem';
  } else {
    baseStyle.padding = '0.55rem 1.15rem';
    baseStyle.fontSize = '0.875rem';
  }

  // Variants
  if (variant === 'primary') {
    baseStyle.backgroundColor = 'var(--primary)';
    baseStyle.color = '#FFFFFF';
  } else if (variant === 'secondary') {
    baseStyle.backgroundColor = 'var(--primary-light)';
    baseStyle.color = 'var(--primary)';
    baseStyle.border = '1px solid var(--primary-border)';
  } else if (variant === 'outline') {
    baseStyle.backgroundColor = 'transparent';
    baseStyle.color = 'var(--text)';
    baseStyle.border = '1px solid var(--border)';
  } else if (variant === 'danger') {
    baseStyle.backgroundColor = 'var(--danger)';
    baseStyle.color = '#FFFFFF';
  } else if (variant === 'ghost') {
    baseStyle.backgroundColor = 'transparent';
    baseStyle.color = 'var(--text-secondary)';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={baseStyle}
      className={className}
      {...props}
    >
      {isLoading ? (
        <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
      ) : Icon ? (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
