import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search by location name, city, or address...",
  className = '',
  style = {}
}) => {
  const handleClear = () => {
    onChange({ target: { value: '' } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', ...style }} className={className}>
      <Search
        size={19}
        style={{
          position: 'absolute',
          left: '14px',
          color: 'var(--text-secondary)',
          pointerEvents: 'none'
        }}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          width: '100%',
          height: '46px',
          paddingLeft: '44px',
          paddingRight: value ? '40px' : '14px',
          fontSize: '0.95rem',
          color: 'var(--text)',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          outline: 'none',
          boxShadow: 'var(--shadow-sm)',
          transition: 'var(--transition)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--primary)';
          e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.12)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border)';
          e.target.style.boxShadow = 'var(--shadow-sm)';
        }}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          style={{
            position: 'absolute',
            right: '12px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px'
          }}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
