import React from 'react';
import { Zap, Accessibility, Crown, Car, ArrowDown, Shield, CheckCircle2, Clock } from 'lucide-react';

const SlotGrid = ({ slots = [], selectedSlot = null, onSelectSlot = () => {}, pricePerHour = 40 }) => {
  // Group slots by row prefix (A, B, C, D)
  const groupedSlots = slots.reduce((acc, slot) => {
    const rowPrefix = slot.slotNumber?.charAt(0) || 'A';
    if (!acc[rowPrefix]) acc[rowPrefix] = [];
    acc[rowPrefix].push(slot);
    return acc;
  }, {});

  const rows = Object.keys(groupedSlots).sort();

  const getSlotStyle = (status, isSelected) => {
    if (isSelected) {
      return {
        bg: 'var(--primary)',
        color: '#FFFFFF',
        border: 'var(--primary)',
        badgeBg: 'rgba(255, 255, 255, 0.25)',
        badgeColor: '#FFFFFF'
      };
    }
    switch (status?.toUpperCase()) {
      case 'AVAILABLE':
        return {
          bg: 'var(--success-light)',
          color: 'var(--success)',
          border: 'var(--success-border)',
          badgeBg: '#DCFCE7',
          badgeColor: '#15803D'
        };
      case 'RESERVED':
        return {
          bg: 'var(--warning-light)',
          color: 'var(--warning)',
          border: 'var(--warning-border)',
          badgeBg: '#FEF3C7',
          badgeColor: '#B45309'
        };
      case 'OCCUPIED':
        return {
          bg: 'var(--surface-raised)',
          color: 'var(--text-muted)',
          border: 'var(--border)',
          badgeBg: 'var(--bg-subtle)',
          badgeColor: 'var(--text-muted)'
        };
      case 'MAINTENANCE':
        return {
          bg: 'var(--bg-subtle)',
          color: 'var(--text-light)',
          border: 'var(--border)',
          badgeBg: 'var(--bg-subtle)',
          badgeColor: 'var(--text-light)'
        };
      default:
        return {
          bg: 'var(--surface)',
          color: 'var(--text)',
          border: 'var(--border)',
          badgeBg: 'var(--bg-subtle)',
          badgeColor: 'var(--text-muted)'
        };
    }
  };

  return (
    <div className="clean-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Legend and Entrance Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>Visual Parking Layout</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Select an available slot to initiate reservation</p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.78rem', fontWeight: 700 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
            <span style={{ color: 'var(--text-secondary)' }}>Available</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--warning)' }}></span>
            <span style={{ color: 'var(--text-secondary)' }}>Reserved</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--text-muted)' }}></span>
            <span style={{ color: 'var(--text-secondary)' }}>Occupied</span>
          </div>
        </div>
      </div>

      {/* Realistic Garage Floor Blueprint */}
      <div style={{
        backgroundColor: 'var(--bg-subtle)',
        border: '1.5px dashed var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem'
      }}>
        {/* ENTRANCE INDICATOR */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--surface)',
          padding: '0.4rem 1.25rem',
          borderRadius: '9999px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-xs)',
          fontSize: '0.82rem',
          fontWeight: 800,
          color: 'var(--primary)',
          letterSpacing: '0.05em'
        }}>
          ENTRANCE <ArrowDown size={16} />
        </div>

        <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--border)' }}></div>

        {/* PARKING ROWS & AISLES */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {rows.map((rowKey, idx) => (
            <React.Fragment key={rowKey}>
              {/* Row Container */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  SECTION {rowKey}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                  gap: '0.75rem'
                }}>
                  {groupedSlots[rowKey].map((slot) => {
                    const isSelected = selectedSlot && (
                      selectedSlot === slot.id ||
                      selectedSlot === slot.slotNumber ||
                      selectedSlot?.id === slot.id ||
                      selectedSlot?.slotNumber === slot.slotNumber ||
                      selectedSlot?.id === slot.slotNumber
                    );
                    const style = getSlotStyle(slot.status, isSelected);
                    const isAvailable = slot.status?.toUpperCase() === 'AVAILABLE';
                    const isOccupiedOrReserved = slot.status?.toUpperCase() === 'OCCUPIED' || slot.status?.toUpperCase() === 'RESERVED';

                    return (
                      <button
                        key={slot.id || slot.slotNumber}
                        disabled={!isAvailable && !isSelected}
                        onClick={() => onSelectSlot(slot)}
                        style={{
                          backgroundColor: style.bg,
                          color: style.color,
                          border: `2px solid ${style.border}`,
                          borderRadius: 'var(--radius-md)',
                          padding: '0.75rem 0.5rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          height: '90px',
                          cursor: isAvailable ? 'pointer' : 'not-allowed',
                          transition: 'var(--transition)',
                          position: 'relative',
                          boxShadow: isSelected ? '0 0 0 3px var(--primary-light)' : 'none',
                          transform: isSelected ? 'scale(1.03)' : 'scale(1)'
                        }}
                      >
                        {/* Slot Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{slot.slotNumber}</span>
                          {slot.slotType === 'EV' && <Zap size={13} color="var(--warning)" />}
                          {slot.slotType === 'VIP' && <Crown size={13} color="var(--primary)" />}
                        </div>

                        {/* Center Visual Content (Car Graphic if occupied/reserved) */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 'auto' }}>
                          {isOccupiedOrReserved ? (
                            <Car size={26} style={{ opacity: 0.85 }} />
                          ) : (
                            <div style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              backgroundColor: style.badgeBg,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: style.border }}></span>
                            </div>
                          )}
                        </div>

                        {/* Slot Footer Status Label */}
                        <div style={{
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          padding: '0.15rem 0.4rem',
                          borderRadius: '4px',
                          backgroundColor: style.badgeBg,
                          color: style.badgeColor,
                          textTransform: 'uppercase'
                        }}>
                          {isSelected ? 'SELECTED' : slot.status}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Driving Aisle visual separator after every row except last */}
              {idx < rows.length - 1 && (
                <div style={{
                  height: '32px',
                  backgroundColor: 'var(--surface)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px dashed var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'var(--text-light)',
                  letterSpacing: '0.1em'
                }}>
                  ═══ DRIVEWAY / AISLE ═══
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlotGrid;
