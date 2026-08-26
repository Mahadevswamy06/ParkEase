import React from 'react';

const Card = ({
  children,
  className = '',
  style = {},
  hoverable = false,
  padding = 'md',
  onClick,
  ...props
}) => {
  const getPadding = () => {
    switch (padding) {
      case 'none': return '0';
      case 'sm': return '1rem';
      case 'lg': return '2rem';
      case 'md':
      default: return '1.5rem';
    }
  };

  const cardStyle = {
    backgroundColor: 'var(--card-bg-solid)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow-md)',
    padding: getPadding(),
    transition: 'var(--transition)',
    cursor: onClick ? 'pointer' : 'default',
    overflow: 'hidden',
    ...style
  };

  return (
    <div
      onClick={onClick}
      style={cardStyle}
      className={`card-component glass-card ${hoverable ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
