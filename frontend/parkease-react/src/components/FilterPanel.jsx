import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import Button from './Button';

const FilterPanel = ({
  selectedCity,
  onCityChange,
  maxPrice,
  onPriceChange,
  onlyAvailable,
  onAvailabilityChange,
  selectedAmenity,
  onAmenityChange,
  onReset
}) => {
  const cities = ['All', 'New Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Kolkata', 'Chennai'];
  const amenitiesList = ['All', 'EV Charging', 'Covered Parking', '24/7 Security', 'Valet Parking', 'Car Wash Bay'];

  return (
    <div style={{
      backgroundColor: 'var(--card-bg)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border)',
      padding: '1.25rem',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="var(--primary)" />
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>Filter Parking</h4>
        </div>
        <Button variant="ghost" size="sm" icon={RotateCcw} onClick={onReset}>
          Reset
        </Button>
      </div>

      {/* City Filter */}
      <div>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '0.5rem' }}>
          Select Indian City
        </label>
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          style={{
            width: '100%',
            height: '40px',
            padding: '0 0.75rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--card-bg)',
            fontSize: '0.9rem',
            color: 'var(--text)',
            outline: 'none'
          }}
        >
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Max Hourly Rate */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>
            Max Hourly Rate
          </label>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
            ₹{maxPrice}/hr
          </span>
        </div>
        <input
          type="range"
          min="30"
          max="250"
          step="10"
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--primary)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          <span>₹30/hr</span>
          <span>₹250/hr</span>
        </div>
      </div>

      {/* Amenity Filter */}
      <div>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '0.5rem' }}>
          Amenities
        </label>
        <select
          value={selectedAmenity}
          onChange={(e) => onAmenityChange(e.target.value)}
          style={{
            width: '100%',
            height: '40px',
            padding: '0 0.75rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--card-bg)',
            fontSize: '0.9rem',
            color: 'var(--text)',
            outline: 'none'
          }}
        >
          {amenitiesList.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* Availability Switch */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
          Available Slots Only
        </span>
        <input
          type="checkbox"
          checked={onlyAvailable}
          onChange={(e) => onAvailabilityChange(e.target.checked)}
          style={{
            width: '18px',
            height: '18px',
            accentColor: 'var(--primary)',
            cursor: 'pointer'
          }}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
