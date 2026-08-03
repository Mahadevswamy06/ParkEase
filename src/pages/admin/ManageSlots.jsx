import React, { useState } from 'react';
import { Layers, Zap, CheckCircle2, ShieldAlert, RefreshCw } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import { useParking } from '../../context/ParkingContext';
import { useToast } from '../../context/ToastContext';

const ManageSlots = () => {
  const { locations, updateSlotStatus } = useParking();
  const { addToast } = useToast();

  const [selectedLocId, setSelectedLocId] = useState(locations[0]?.id || 'loc-1');
  const currentLocation = locations.find(l => l.id === selectedLocId) || locations[0];

  const handleToggleSlot = (slot) => {
    let nextStatus = 'available';
    if (slot.status === 'available') nextStatus = 'occupied';
    else if (slot.status === 'occupied') nextStatus = 'reserved';

    updateSlotStatus(currentLocation.id, slot.id, nextStatus);
    addToast(`Slot ${slot.id} status changed to ${nextStatus}.`, 'info');
  };

  return (
    <div className="manage-slots-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>Manage Parking Slots</h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Interactive slot control panel. Click any slot to toggle between Available, Occupied, and Reserved states.
        </p>
      </div>

      {/* Select Location Picker */}
      <Card padding="md" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
          <Layers size={20} color="var(--primary)" />
          <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>Facility:</label>
          <select
            value={selectedLocId}
            onChange={(e) => setSelectedLocId(e.target.value)}
            style={{
              flex: 1,
              height: '42px',
              padding: '0 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} ({loc.city}) — {loc.availableSlots} free
              </option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Tip: Click slot badge to manually override state
        </div>
      </Card>

      {/* Live Floorplan Grid */}
      <Card padding="lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>
            {currentLocation.name} Floor Layout
          </h3>

          <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', fontWeight: 600 }}>
            <StatusBadge status="available">Available</StatusBadge>
            <StatusBadge status="occupied">Occupied</StatusBadge>
            <StatusBadge status="reserved">Reserved</StatusBadge>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: '1rem',
          padding: '1.5rem',
          backgroundColor: '#F8FAFC',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)'
        }}>
          {currentLocation.slots.map((slot) => {
            const isAvail = slot.status === 'available';
            const isOccupied = slot.status === 'occupied';
            const isReserved = slot.status === 'reserved';
            const isEV = slot.type === 'ev';

            return (
              <button
                key={slot.id}
                onClick={() => handleToggleSlot(slot)}
                style={{
                  height: '90px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${isAvail ? '#22C55E' : isOccupied ? '#EF4444' : '#F59E0B'}`,
                  backgroundColor: isAvail ? '#F0FDF4' : isOccupied ? '#FEF2F2' : '#FFFBEB',
                  color: isAvail ? '#15803D' : isOccupied ? '#B91C1C' : '#B45309',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition)'
                }}
              >
                <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>{slot.id}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize' }}>
                  {slot.status}
                </span>
                {isEV && (
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#D97706', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Zap size={10} /> EV
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ManageSlots;
