import React, { useState } from 'react';
import { Layers, CheckCircle2, Clock, Car, AlertTriangle, ShieldOff, Zap } from 'lucide-react';
import Button from '../../components/Button';
import { useParking } from '../../context/ParkingContext';

const ManageSlots = () => {
  const { locations, updateSlotStatus } = useParking();
  const [selectedLocId, setSelectedLocId] = useState(locations[0]?.id || 'loc-1');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const activeLocation = locations.find(l => l.id === selectedLocId) || locations[0];

  const handleStatusChange = (newStatus) => {
    if (!selectedSlot || !activeLocation) return;
    updateSlotStatus(activeLocation.id, selectedSlot.id, newStatus);
    setSelectedSlot(prev => ({ ...prev, status: newStatus }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Visual Slot Matrix & IoT Sensor Controls
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time bay status monitoring and manual hardware state override
          </p>
        </div>

        {/* Location Selector */}
        <div>
          <select
            value={selectedLocId}
            onChange={(e) => {
              setSelectedLocId(e.target.value);
              setSelectedSlot(null);
            }}
            style={{ padding: '0.6rem 1rem', fontSize: '0.9rem', fontWeight: 700 }}
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} ({loc.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status Legend Bar */}
      <div className="clean-card" style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status Legend:</span>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: '#22C55E' }} />
          <span>Available</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: '#0284C7' }} />
          <span>Reserved</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: '#EF4444' }} />
          <span>Occupied</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: '#EAB308' }} />
          <span>Maintenance</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: '#94A3B8' }} />
          <span>Disabled</span>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="clean-card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1.25rem' }}>
          {activeLocation.name} — Floor Bay Grid ({activeLocation.slots?.length || 0} Slots)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }} className="slot-matrix-grid">
          {activeLocation.slots?.map((slot) => {
            const isSelected = selectedSlot?.id === slot.id;

            let bg = '#22C55E';
            let labelColor = '#FFFFFF';
            if (slot.status === 'reserved') bg = '#0284C7';
            if (slot.status === 'occupied') bg = '#EF4444';
            if (slot.status === 'maintenance') bg = '#EAB308';
            if (slot.status === 'disabled') bg = '#94A3B8';

            return (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                style={{
                  padding: '1.25rem 0.5rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: bg,
                  color: labelColor,
                  border: isSelected ? '3px solid #0F172A' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: isSelected ? 'var(--shadow-lg)' : 'var(--shadow-xs)',
                  transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.15s ease'
                }}
              >
                <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>{slot.id}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.9 }}>
                  {slot.status}
                </div>
                {slot.vehiclePlate && (
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>
                    {slot.vehiclePlate}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Slot Inspector Modal */}
      {selectedSlot && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="clean-card" style={{ width: '100%', maxWidth: '440px', padding: '1.5rem', backgroundColor: 'var(--surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)' }}>
                  Slot Inspector — {selectedSlot.id}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Facility: {activeLocation.name}
                </p>
              </div>
              <button onClick={() => setSelectedSlot(null)} style={{ border: 'none', background: 'transparent', fontSize: '1.25rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Status</span>
                <span className="badge badge-primary" style={{ textTransform: 'uppercase' }}>{selectedSlot.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Occupied Vehicle Plate</span>
                <span style={{ fontWeight: 700 }}>{selectedSlot.vehiclePlate || 'None'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>IoT Sensor Status</span>
                <span style={{ color: 'var(--success)', fontWeight: 700 }}>ONLINE (Telemetry OK)</span>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Manual Hardware Override Actions
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <Button variant="outline" size="sm" onClick={() => handleStatusChange('available')} style={{ borderColor: '#22C55E', color: '#15803D' }}>
                Mark Available
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleStatusChange('reserved')} style={{ borderColor: '#0284C7', color: '#0369A1' }}>
                Mark Reserved
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleStatusChange('occupied')} style={{ borderColor: '#EF4444', color: '#B91C1C' }}>
                Mark Occupied
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleStatusChange('maintenance')} style={{ borderColor: '#EAB308', color: '#A16207' }}>
                Maintenance
              </Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .slot-matrix-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
};

export default ManageSlots;
