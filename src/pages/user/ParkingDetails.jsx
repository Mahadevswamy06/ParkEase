import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Star, Clock, ShieldCheck, Zap, ArrowLeft, Car, CheckCircle2, ChevronRight } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import BookParkingModal from './BookParkingModal';
import { useParking } from '../../context/ParkingContext';
import { formatCurrency } from '../../utils/formatters';

const ParkingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locations } = useParking();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [highlightedSlot, setHighlightedSlot] = useState(null);

  const location = locations.find(l => l.id === id) || locations[0];

  const availableSlotsList = location.slots.filter(s => s.status === 'available');

  const handleSlotClick = (slotId, status) => {
    if (status === 'available') {
      setHighlightedSlot(slotId);
      setBookingModalOpen(true);
    }
  };

  return (
    <div className="parking-details-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} /> Back to locations
        </button>
      </div>

      {/* Hero Banner Card */}
      <Card padding="none" style={{ overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: '320px' }}>
          <img src={location.image} alt={location.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '2rem'
          }}>
            <div style={{ color: '#FFFFFF', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', gap: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <StatusBadge status={location.isOpen ? "open" : "closed"}>
                    {location.isOpen ? "Open 24/7" : "Closed"}
                  </StatusBadge>
                  <span style={{ fontSize: '0.85rem', color: '#E2E8F0', fontWeight: 500 }}>
                    {location.city}
                  </span>
                </div>
                <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  {location.name}
                </h1>
                <p style={{ fontSize: '1rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <MapPin size={18} color="#93C5FD" />
                  {location.address} ({location.distance})
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(8px)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#93C5FD', textTransform: 'uppercase' }}>Hourly Rate</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>{formatCurrency(location.pricePerHour)}</div>
                </div>
                <Button variant="primary" size="lg" onClick={() => setBookingModalOpen(true)}>
                  Reserve Parking
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {/* Left Column: Interactive Slot Grid Floorplan */}
        <Card padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>Interactive Slot Grid</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tap any available spot to instantly initiate booking</p>
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--success)' }}>
              {location.availableSlots} Slots Free
            </span>
          </div>

          {/* Grid Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.8rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary-border)' }} />
              Available
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#E2E8F0' }} />
              Occupied
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#FEF08A' }} />
              EV Charging Slot
            </span>
          </div>

          {/* Slot Map Display */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: '0.85rem',
            padding: '1rem',
            backgroundColor: '#F1F5F9',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)'
          }}>
            {location.slots.map((slot) => {
              const isAvailable = slot.status === 'available';
              const isEV = slot.type === 'ev';

              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => handleSlotClick(slot.id, slot.status)}
                  style={{
                    height: '74px',
                    borderRadius: 'var(--radius-md)',
                    border: `2px solid ${isAvailable ? 'var(--primary)' : '#CBD5E1'}`,
                    backgroundColor: isAvailable ? (isEV ? '#FEF9C3' : '#FFFFFF') : '#E2E8F0',
                    color: isAvailable ? 'var(--text)' : '#94A3B8',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    cursor: isAvailable ? 'pointer' : 'not-allowed',
                    boxShadow: isAvailable ? 'var(--shadow-sm)' : 'none',
                    transition: 'var(--transition)'
                  }}
                >
                  <span style={{ fontSize: '1rem', fontWeight: 800 }}>{slot.id}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.7rem', fontWeight: 600 }}>
                    {isEV ? (
                      <span style={{ color: '#D97706', display: 'flex', alignItems: 'center' }}><Zap size={12} /> EV</span>
                    ) : (
                      <span>{isAvailable ? 'Free' : 'Busy'}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Right Column: Lot Details & Amenities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card padding="lg">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>About this Facility</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {location.description}
            </p>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text)' }}>Included Amenities</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {location.amenities.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text)', fontWeight: 500 }}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>Operating Hours</h3>
            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="var(--primary)" />
              <span>{location.operatingHours}</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Booking Modal */}
      <BookParkingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        location={location}
        initialSlot={highlightedSlot}
      />
    </div>
  );
};

export default ParkingDetails;
