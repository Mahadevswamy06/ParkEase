import React from 'react';

const Input = ({
  label,
  error,
  icon: Icon,
  helperText,
  fullWidth = true,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  disabled = false,
  required = false,
  className = '',
  style = {},
  ...props
}) => {
  return (
    <div style={{ width: fullWidth ? '100%' : 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }} className={className}>
      {label && (
        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', display: 'flex', gap: '0.2rem' }}>
          {label}
          {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}
      
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <div style={{
            position: 'absolute',
            left: '12px',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none'
          }}>
            <Icon size={18} />
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          style={{
            width: '100%',
            height: '42px',
            paddingLeft: Icon ? '40px' : '14px',
            paddingRight: '14px',
            fontSize: '0.95rem',
            color: 'var(--text)',
            backgroundColor: disabled ? '#F1F5F9' : '#FFFFFF',
            border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)',
            outline: 'none',
            transition: 'var(--transition)',
            boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)',
            ...style
          }}
          onFocus={(e) => {
            if (!error) e.target.style.borderColor = 'var(--primary)';
            e.target.style.boxShadow = `0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(37, 99, 235, 0.15)'}`;
          }}
          onBlur={(e) => {
            if (!error) e.target.style.borderColor = 'var(--border)';
            e.target.style.boxShadow = '0 1px 2px rgba(15, 23, 42, 0.03)';
          }}
          {...props}
        />
      </div>

      {error && <span style={{ fontSize: '0.8rem', color: 'var(--danger)', fontWeight: 500 }}>{error}</span>}
      {!error && helperText && <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{helperText}</span>}
    </div>
  );
};

export default Input;
