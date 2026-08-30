import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Filter, SlidersHorizontal, Zap, Star, ShieldCheck, Check, ArrowRight, AlertCircle, Clock, Navigation, Compass } from 'lucide-react';
import Button from '../../components/Button';
import InteractiveMap from '../../components/common/InteractiveMap';
import BookingModal from '../../components/booking/BookingModal';
import DigitalPass from '../../components/booking/DigitalPass';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { useParking } from '../../context/ParkingContext';
import { useDebounce } from '../../hooks/useDebounce';

const FindParking = () => {
  const navigate = useNavigate();
  const {
    filteredLocations,
    bookings,
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    onlyAvailable,
    setOnlyAvailable,
    sortBy,
    setSortBy,
    userLocation,
    isGeolocating,
    fetchUserLiveLocation,
    lastUpdatedTime,
    loading
  } = useParking();

  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearch = useDebounce(searchInput, 300);
  const [selectedLocation, setSelectedLocation] = useState(filteredLocations[0] || null);
  const [bookingLoc, setBookingLoc] = useState(null);
  const [viewPassBooking, setViewPassBooking] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Sync search input
  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  // Update selected location when filtered items change
  useEffect(() => {
    if (filteredLocations.length > 0 && !selectedLocation) {
      setSelectedLocation(filteredLocations[0]);
    }
  }, [filteredLocations, selectedLocation]);

  const handleFetchLocation = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Location access is disabled or not supported. Search for a location manually.');
      return;
    }
    fetchUserLiveLocation();
  };

  const activeBooking = bookings.find(b => b.status === 'active' || b.status === 'CONFIRMED');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: 'calc(100vh - 120px)' }}>
      
      {/* 1. Header & Location Permission Alert State */}
      {locationError && (
        <div style={{
          padding: '0.85rem 1.25rem',
          backgroundColor: 'var(--warning-light)',
          border: '1px solid var(--warning-border)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--warning)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.875rem'
        }}>
          <AlertCircle size={18} />
          <div style={{ flex: 1 }}>
            <strong>Location Access Notice:</strong> Location access is disabled. Search for a location manually.
          </div>
          <button onClick={() => setLocationError(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--warning)' }}>✕</button>
        </div>
      )}

      {/* Prominent Search Banner */}
      <div className="clean-card" style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.01em' }}>
          Where do you want to park?
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          {/* Search Input Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <MapPin size={18} color="var(--primary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="📍 Current location or search city, mall, airport..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '2.5rem',
                paddingRight: '1rem',
                height: '46px',
                fontSize: '0.95rem',
                borderRadius: 'var(--radius-md)'
              }}
            />
          </div>

          {/* Quick Filter Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{ height: '46px', padding: '0 0.85rem' }}
            >
              <option value="All">All Cities</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ height: '46px', padding: '0 0.85rem' }}
            >
              <option value="distance">Nearest First</option>
              <option value="price_asc">Lowest Price</option>
              <option value="availability">Most Available</option>
            </select>

            <Button variant="outline" onClick={handleFetchLocation} isLoading={isGeolocating} icon={Compass} style={{ height: '46px' }}>
              GPS
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Split Screen Dashboard (Map on Left/Center, Nearby Parking List on Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem', height: '520px' }} className="split-dashboard">
        
        {/* LEFT/CENTER: Interactive Google Map Simulation */}
        <div style={{ height: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <InteractiveMap
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onSelectLocation={(loc) => setSelectedLocation(loc)}
            height="100%"
          />
        </div>

        {/* RIGHT: Nearby Parking Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', overflowY: 'auto', paddingRight: '0.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text)' }}>Nearby Parking</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{filteredLocations.length} found • {lastUpdatedTime}</span>
          </div>

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : filteredLocations.length === 0 ? (
            <EmptyState
              title="No parking available nearby"
              description="Try increasing your search radius or clear your active search query."
              onAction={() => { setSearchInput(''); setSelectedCity('All'); setOnlyAvailable(false); }}
              actionText="Reset Filters"
            />
          ) : (
            filteredLocations.map((loc) => {
              const isSelected = selectedLocation?.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className="clean-card clean-card-hover"
                  style={{
                    padding: '1.15rem',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--card-border)',
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text)' }}>{loc.name}</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <MapPin size={13} color="var(--primary)" /> {loc.distance || '0.8 km'} • ₹{loc.pricePerHour}/hr
                      </div>
                    </div>
                    <span className={`badge ${loc.availableSlots > 0 ? 'badge-success' : 'badge-danger'}`}>
                      {loc.availableSlots} spots available
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
                    <Link to={`/parking/${loc.id}`} style={{ flex: 1, textDecoration: 'none' }} onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" size="sm" fullWidth>
                        View Slots
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={loc.availableSlots === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setBookingLoc(loc);
                      }}
                      style={{ flex: 1 }}
                    >
                      Reserve Spot
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 3. Recent Bookings Card Section */}
      {activeBooking && (
        <div className="clean-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Recent Booking
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.1rem'
              }}>
                🚗
              </div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text)' }}>
                  {activeBooking.parkingName} <span style={{ color: 'var(--primary)' }}>• Slot {activeBooking.slotId}</span>
                </div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Today {activeBooking.startTime || '7:00 PM'} • Vehicle: {activeBooking.vehicleNumber || 'KA-01-AB-1234'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="badge badge-success" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                CONFIRMED
              </span>
              <Button variant="outline" size="sm" onClick={() => setViewPassBooking(activeBooking)}>
                View Pass
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingLoc && (
        <BookingModal
          location={bookingLoc}
          isOpen={!!bookingLoc}
          onClose={() => setBookingLoc(null)}
        />
      )}

      {/* View Digital Pass Modal */}
      {viewPassBooking && (
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
          <div style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
            <button
              onClick={() => setViewPassBooking(null)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '12px',
                zIndex: 10,
                border: 'none',
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            <DigitalPass booking={viewPassBooking} />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .split-dashboard { grid-template-columns: 1fr !important; height: auto !important; }
        }
      `}</style>
    </div>
  );
};

export default FindParking;
