import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Zap, Shield, Star, CheckCircle, Car, ArrowLeft, Layers, AlertCircle, Calendar, CheckCircle2 } from 'lucide-react';
import Button from '../../components/Button';
import InteractiveMap from '../../components/common/InteractiveMap';
import SlotGrid from '../../components/SlotGrid';
import BookingModal from '../../components/booking/BookingModal';
import { parkingService } from '../../services/parkingService';
import { useParking } from '../../context/ParkingContext';

const ParkingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locations } = useParking();

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        // Look up in live locations context first or fetch from service
        const found = locations.find(l => String(l.id) === String(id));
        if (found) {
          setLocation(found);
        } else {
          const data = await parkingService.getLocationById(id);
          setLocation(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadDetail();
  }, [id, locations]);

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading parking location details...</div>;
  }

  if (!location) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Parking location not found.</div>;
  }

  const defaultSlots = location.slots || [
    { id: 'A01', slotNumber: 'A01', status: 'OCCUPIED', slotType: 'NORMAL' },
    { id: 'A02', slotNumber: 'A02', status: 'AVAILABLE', slotType: 'NORMAL' },
    { id: 'A03', slotNumber: 'A03', status: 'RESERVED', slotType: 'EV' },
    { id: 'A04', slotNumber: 'A04', status: 'AVAILABLE', slotType: 'VIP' },
    { id: 'B01', slotNumber: 'B01', status: 'AVAILABLE', slotType: 'NORMAL' },
    { id: 'B02', slotNumber: 'B02', status: 'OCCUPIED', slotType: 'EV' },
    { id: 'B03', slotNumber: 'B03', status: 'AVAILABLE', slotType: 'NORMAL' },
    { id: 'C01', slotNumber: 'C01', status: 'AVAILABLE', slotType: 'NORMAL' },
    { id: 'C02', slotNumber: 'C02', status: 'OCCUPIED', slotType: 'NORMAL' },
    { id: 'C03', slotNumber: 'C03', status: 'AVAILABLE', slotType: 'NORMAL' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Back Navigation Bar */}
      <div>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} icon={ArrowLeft}>
          Back to Parking Search
        </Button>
      </div>

      {/* Main Header Card */}
      <div className="clean-card" style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className={`badge ${location.availableSlots > 0 ? 'badge-success' : 'badge-danger'}`}>
                {location.availableSlots > 0 ? `${location.availableSlots} slots available` : 'Full'}
              </span>
              <span className="badge badge-primary">{location.operatingHours || '24/7 Open'}</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              {location.name}
            </h1>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <MapPin size={16} color="var(--primary)" /> {location.address} • {location.distance || '0.8 km'}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
              ₹{location.pricePerHour}<span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>/hour</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              ⭐ {location.rating || 4.8} ({location.reviewsCount || 42} reviews)
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Visual Slot Layout Left + Slot Detail/Reservation Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }} className="parking-details-grid">
        
        {/* LEFT: Visual Parking Blueprint Layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <SlotGrid
            slots={defaultSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={(slot) => setSelectedSlot(slot)}
            pricePerHour={location.pricePerHour}
          />

          {/* Amenities & Security Info */}
          <div className="clean-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.85rem' }}>
              Facility Amenities & Features
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {(location.amenities || ['24/7 Security CCTV', 'EV Fast Charger', 'ANPR Auto Gate', 'Covered Roof']).map((am, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Slot Detail & Reservation Action Drawer Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="clean-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>
              {selectedSlot ? `Slot ${typeof selectedSlot === 'string' ? selectedSlot : (selectedSlot.slotNumber || selectedSlot.id)}` : 'Select a Slot'}
            </h3>

            {selectedSlot ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '0.85rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Status</span>
                    <span className="badge badge-success">AVAILABLE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Tariff Rate</span>
                    <span style={{ fontWeight: 700 }}>₹{location.pricePerHour} / hour</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Slot Type</span>
                    <span style={{ fontWeight: 700 }}>{selectedSlot.slotType || 'Standard'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Today's Time</span>
                    <span style={{ fontWeight: 700 }}>6:00 PM → 8:00 PM</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => setIsBookingOpen(true)}
                >
                  Reserve Slot {typeof selectedSlot === 'string' ? selectedSlot : (selectedSlot.slotNumber || selectedSlot.id)}
                </Button>
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Click on any green slot in the floor blueprint on the left to select it for reservation.
              </div>
            )}
          </div>

          {/* Interactive Location Map Preview Card */}
          <div className="clean-card" style={{ padding: '0.5rem', height: '220px' }}>
            <InteractiveMap locations={[location]} selectedLocation={location} height="100%" />
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          location={location}
          initialSlot={selectedSlot}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .parking-details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default ParkingDetails;
