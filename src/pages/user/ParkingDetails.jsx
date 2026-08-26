import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Zap, Shield, Star, CheckCircle, Car, ArrowLeft, Layers, AlertCircle } from 'lucide-react';
import Button from '../../components/Button';
import InteractiveMap from '../../components/common/InteractiveMap';
import BookingModal from '../../components/booking/BookingModal';
import { parkingService } from '../../services/parkingService';

const ParkingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const data = await parkingService.getLocationById(id);
        setLocation(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadDetail();
  }, [id]);

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading parking location details...</div>;
  }

  if (!location) {
    return <div style={{ padding: '3rem', textAlign: 'center' }}>Parking location not found.</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Back navigation button */}
      <div>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)} icon={ArrowLeft}>
          Back to Parking List
        </Button>
      </div>

      {/* Main Header Card */}
      <div className="clean-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className={`badge ${location.availableSlots > 0 ? 'badge-success' : 'badge-danger'}`}>
                {location.availableSlots > 0 ? `${location.availableSlots} slots available` : 'Full'}
              </span>
              <span className="badge badge-primary">{location.operatingHours}</span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              {location.name}
            </h1>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <MapPin size={16} color="var(--primary)" /> {location.address} • {location.distance}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
              ₹{location.pricePerHour}<span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>/hour</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              ⭐ {location.rating} ({location.reviewsCount} verified reviews)
            </div>
          </div>
        </div>

        {/* Gallery / Cover Image */}
        <div style={{ height: '320px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', backgroundColor: 'var(--bg-subtle)' }}>
          <img src={location.image} alt={location.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Two Column Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="details-grid">
        {/* Left Column: Details & Specs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Description */}
          <div className="clean-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.75rem' }}>
              About this Facility
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.925rem' }}>
              {location.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="clean-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem' }}>
              Amenities & Security Features
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
              {location.amenities?.map((am, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Parking Rules */}
          <div className="clean-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.85rem' }}>
              Facility Parking Rules
            </h3>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {location.rules?.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Reservation Sidebar Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="clean-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>
              Reserve Your Parking Spot
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Hourly Tariff</span>
                <span style={{ fontWeight: 700 }}>₹{location.pricePerHour}/hr</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Capacity</span>
                <span style={{ fontWeight: 700 }}>{location.totalSlots} Slots</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Live Availability</span>
                <span style={{ fontWeight: 700, color: location.availableSlots > 0 ? 'var(--success)' : 'var(--danger)' }}>
                  {location.availableSlots} Slots Free
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={location.availableSlots === 0}
              onClick={() => setIsBookingOpen(true)}
            >
              Reserve Spot Now
            </Button>
          </div>

          {/* Interactive Map Preview Card */}
          <div className="clean-card" style={{ padding: '0.75rem', height: '240px' }}>
            <InteractiveMap locations={[location]} selectedLocation={location} height="100%" />
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          location={location}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default ParkingDetails;
