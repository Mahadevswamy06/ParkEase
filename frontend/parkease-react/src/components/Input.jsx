import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

const Input = ({
  label,
  error,
  success,
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
  const isPassword = type === 'password';
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [iconRotated, setIconRotated] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setIconRotated(true);
    setTimeout(() => setIconRotated(false), 300);
  };

  return (
    <div
      style={{
        width: fullWidth ? '100%' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem'
      }}
      className={`${className} ${error ? 'animate-shake' : ''}`}
    >
      {label && (
        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', display: 'flex', gap: '0.25rem' }}>
          {label}
          {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </label>
      )}
      
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Left Input Icon */}
        {Icon && (
          <div style={{
            position: 'absolute',
            left: '14px',
            color: isFocused ? '#7C3AED' : '#94A3B8',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 2,
            transition: 'color 0.3s ease'
          }}>
            <Icon size={18} />
          </div>
        )}

        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="custom-input-field"
          style={{
            width: '100%',
            height: '44px',
            paddingLeft: Icon ? '42px' : '14px',
            paddingRight: (isPassword || success || error) ? '42px' : '14px',
            fontSize: '0.95rem',
            color: '#FFFFFF',
            backgroundColor: disabled ? '#374151' : '#111827',
            border: error
              ? '1px solid #EF4444'
              : success
                ? '1px solid #22C55E'
                : isFocused
                  ? '1px solid #7C3AED'
                  : '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            outline: 'none',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: isFocused
              ? (error
                  ? '0 0 0 3px rgba(239, 68, 68, 0.25)'
                  : '0 0 0 3px rgba(124, 58, 237, 0.25)')
              : 'none',
            transform: isFocused ? 'translateY(-1px)' : 'none',
            cursor: disabled ? 'not-allowed' : 'text',
            ...style
          }}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
          {...props}
        />

        {/* Right Password Eye Toggle or Success/Error Status Icon */}
        {isPassword ? (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            style={{
              position: 'absolute',
              right: '12px',
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              transition: 'all 0.3s ease',
              transform: iconRotated ? 'rotate(15deg) scale(1.1)' : 'scale(1)',
              zIndex: 3
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : success ? (
          <div style={{ position: 'absolute', right: '14px', color: '#22C55E', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <CheckCircle2 size={18} />
          </div>
        ) : error ? (
          <div style={{ position: 'absolute', right: '14px', color: '#EF4444', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <AlertCircle size={18} />
          </div>
        ) : null}
      </div>

      {/* Error Message Below Input */}
      {error && (
        <span style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '2px' }}>
          <AlertCircle size={13} /> {error}
        </span>
      )}

      {/* Helper Text Below Input */}
      {!error && helperText && (
        <span style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '2px' }}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
