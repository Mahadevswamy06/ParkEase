import React from 'react';
import { Zap, Wheelchair, Crown, Car } from 'lucide-react';

const SlotGrid = ({ slots = [], selectedSlot = null, onSelectSlot = () => {} }) => {
  const getSlotColor = (status, isSelected) => {
    if (isSelected) return { bg: 'var(--primary)', color: '#FFFFFF', border: 'var(--primary)' };
    switch (status?.toUpperCase()) {
      case 'AVAILABLE':
        return { bg: 'var(--success-light)', color: 'var(--success)', border: 'var(--success-border)' };
      case 'OCCUPIED':
        return { bg: 'var(--danger-light)', color: 'var(--danger)', border: 'var(--danger-border)' };
      case 'RESERVED':
        return { bg: 'var(--warning-light)', color: 'var(--warning)', border: 'var(--warning-border)' };
      case 'MAINTENANCE':
        return { bg: 'var(--bg-subtle)', color: 'var(--text-muted)', border: 'var(--border)' };
      default:
        return { bg: 'var(--surface)', color: 'var(--text)', border: 'var(--border)' };
    }
  };

  const getSlotTypeIcon = (type) => {
    switch (type?.toUpperCase()) {
      case 'EV':
        return <Zap size={12} />;
      case 'DISABLED':
        return <Wheelchair size={12} />;
      case 'VIP':
        return <Crown size={12} />;
      default:
        return <Car size={12} />;
    }
  };

  return (
    <div className="clean-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text)' }}>Interactive Slot Grid</h4>
        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', fontWeight: 700 }}>
          <span style={{ color: 'var(--success)' }}>🟢 Available</span>
          <span style={{ color: 'var(--danger)' }}>🔴 Occupied</span>
          <span style={{ color: 'var(--warning)' }}>🟠 Reserved</span>
          <span style={{ color: 'var(--text-muted)' }}>⚫ Maintenance</span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))',
        gap: '0.65rem'
      }}>
        {slots.map((slot) => {
          const isSelected = selectedSlot?.id === slot.id || selectedSlot?.slotNumber === slot.slotNumber;
          const styles = getSlotColor(slot.status, isSelected);
          const isClickable = slot.status?.toUpperCase() === 'AVAILABLE';

          return (
            <button
              key={slot.id || slot.slotNumber}
              disabled={!isClickable}
              onClick={() => onSelectSlot(slot)}
              style={{
                backgroundColor: styles.bg,
                color: styles.color,
                border: `1.5px solid ${styles.border}`,
                borderRadius: 'var(--radius-md)',
                padding: '0.6rem 0.4rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem',
                cursor: isClickable ? 'pointer' : 'not-allowed',
                opacity: !isClickable && !isSelected ? 0.75 : 1,
                transition: 'var(--transition)',
                boxShadow: isSelected ? '0 0 0 3px var(--primary-light)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.65rem', fontWeight: 700 }}>
                {getSlotTypeIcon(slot.slotType)}
                <span>{slot.slotType || 'NORMAL'}</span>
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{slot.slotNumber}</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>
                {isSelected ? 'SELECTED' : slot.status}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SlotGrid;
