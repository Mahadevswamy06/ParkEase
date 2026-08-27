import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, Car, Zap, ArrowRight, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';
import Button from '../../components/Button';
import { CardSkeleton } from '../../components/common/Skeleton';
import BookingModal from '../../components/booking/BookingModal';
import CheckInCheckout from './CheckInCheckout';
import { useParking } from '../../context/ParkingContext';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { filteredLocations, bookings, loading, lastUpdatedTime, setSearchQuery } = useParking();

  const [dashSearch, setDashSearch] = useState('');
  const [dashDate, setDashDate] = useState(new Date().toISOString().split('T')[0]);
  const [dashTime, setDashTime] = useState('10:00 AM');
  const [dashDuration, setDashDuration] = useState(2);
  const [selectedLocForBooking, setSelectedLocForBooking] = useState(null);

  const activeBooking = bookings.find(b => b.status === 'active' || b.status === 'upcoming');

  const handleDashSearchSubmit = (e) => {
    e.preventDefault();
    if (dashSearch) {
      setSearchQuery(dashSearch);
    }
    navigate('/parking');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Greeting Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Good morning, {currentUser?.name?.split(' ')[0] || 'Mahadev'} 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Where are you parking today?
          </p>
        </div>

        <div className="badge badge-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
          <Zap size={13} /> {lastUpdatedTime}
        </div>
      </div>

      {/* Active Booking Banner Widget (If Active Booking Exists) */}
      {activeBooking && (
        <div className="clean-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--primary-light)',
          borderColor: 'var(--primary-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Car size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
                Active Reservation #{activeBooking.bookingCode}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>
                {activeBooking.parkingName} (Slot {activeBooking.slotId})
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Vehicle: {activeBooking.vehicleNumber} • Entry: {activeBooking.startTime}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/user/bookings" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="sm">
                View Digital Pass
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Search Parking Card */}
      <div className="clean-card" style={{ padding: '1.75rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>
          Search & Reserve Parking
        </h2>

        <form onSubmit={handleDashSearchSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }} className="dash-search-grid">
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Destination / City
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="e.g. Phoenix Marketcity, Whitefield"
                value={dashSearch}
                onChange={(e) => setDashSearch(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.4rem' }}
              />
              <MapPin size={18} color="var(--primary)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Date
            </label>
            <input
              type="date"
              value={dashDate}
              onChange={(e) => setDashDate(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Start Time
            </label>
            <select value={dashTime} onChange={(e) => setDashTime(e.target.value)} style={{ width: '100%' }}>
              <option value="08:00 AM">08:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="06:00 PM">06:00 PM</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Duration
            </label>
            <select value={dashDuration} onChange={(e) => setDashDuration(Number(e.target.value))} style={{ width: '100%' }}>
              <option value={1}>1 Hour</option>
              <option value={2}>2 Hours</option>
              <option value={3}>3 Hours</option>
              <option value={4}>4 Hours</option>
              <option value={8}>8 Hours</option>
            </select>
          </div>

          <Button type="submit" variant="primary" size="md" icon={Search} style={{ height: '42px' }}>
            Search Parking
          </Button>
        </form>
      </div>

      {/* Nearby Parking Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)' }}>
              Nearby Parking Locations
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Showing real-time availability in your vicinity
            </p>
          </div>

          <Link to="/parking" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)', textDecoration: 'none' }}>
            View all ({filteredLocations.length}) →
          </Link>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="nearby-grid">
            {filteredLocations.slice(0, 6).map((loc) => (
              <div key={loc.id} className="clean-card clean-card-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '150px', position: 'relative', overflow: 'hidden' }}>
                  <img src={loc.image} alt={loc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '10px', right: '10px' }} className={`badge ${loc.availableSlots > 0 ? 'badge-success' : 'badge-danger'}`}>
                    {loc.availableSlots > 0 ? `${loc.availableSlots} slots free` : 'Full'}
                  </div>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>{loc.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <MapPin size={13} color="var(--primary)" /> {loc.address} ({loc.distance})
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                    <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>₹{loc.pricePerHour}/hr</span>
                    <span style={{ color: 'var(--text-secondary)' }}>⭐ {loc.rating} ({loc.reviewsCount || 100})</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                    <Link to={`/parking/${loc.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                      <Button variant="outline" size="sm" fullWidth>
                        Details
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={loc.availableSlots === 0}
                      onClick={() => setSelectedLocForBooking(loc)}
                      style={{ flex: 1 }}
                    >
                      Reserve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedLocForBooking && (
        <BookingModal
          location={selectedLocForBooking}
          isOpen={!!selectedLocForBooking}
          onClose={() => setSelectedLocForBooking(null)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .dash-search-grid { grid-template-columns: 1fr !important; }
          .nearby-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
