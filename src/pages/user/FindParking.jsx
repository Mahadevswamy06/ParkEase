import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Filter, SlidersHorizontal, Zap, Star, ShieldCheck, Check } from 'lucide-react';
import Button from '../../components/Button';
import InteractiveMap from '../../components/common/InteractiveMap';
import BookingModal from '../../components/booking/BookingModal';
import EmptyState from '../../components/EmptyState';
import { useParking } from '../../context/ParkingContext';
import { useDebounce } from '../../hooks/useDebounce';

const FindParking = () => {
  const navigate = useNavigate();
  const {
    filteredLocations,
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    maxPrice,
    setMaxPrice,
    onlyAvailable,
    setOnlyAvailable,
    selectedAmenity,
    setSelectedAmenity,
    sortBy,
    setSortBy,
    userLocation,
    isGeolocating,
    fetchUserLiveLocation,
    lastUpdatedTime
  } = useParking();

  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearch = useDebounce(searchInput, 300);
  const [selectedLocation, setSelectedLocation] = useState(filteredLocations[0] || null);
  const [bookingLoc, setBookingLoc] = useState(null);

  // Synchronize debounced search input to global context
  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
      {/* Top Filter Bar */}
      <div className="clean-card" style={{ padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Search Input */}
        <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
          <input
            type="text"
            placeholder="Search by city, landmark or garage name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ width: '100%', paddingLeft: '2.4rem' }}
          />
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* City Filter */}
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} style={{ padding: '0.5rem 0.75rem' }}>
            <option value="All">All Cities</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
          </select>

          {/* Sort By Filter */}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '0.5rem 0.75rem' }}>
            <option value="distance">Nearest First</option>
            <option value="price_asc">Lowest Price</option>
            <option value="availability">Most Available</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* Available Only Toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
            />
            Available Only
          </label>

          {/* Live GPS Button */}
          <Button variant="outline" size="sm" onClick={fetchUserLiveLocation} isLoading={isGeolocating} icon={MapPin}>
            Live GPS
          </Button>
        </div>
      </div>

      {/* Main Dual Panel Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.4fr', gap: '1.25rem', flex: 1, minHeight: 0 }} className="find-parking-dual">
        {/* LEFT PANEL: Results List */}
        <div style={{ overflowY: 'auto', paddingRight: '0.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.25rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              {filteredLocations.length} parking locations found
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {lastUpdatedTime}
            </div>
          </div>

          {filteredLocations.length === 0 ? (
            <EmptyState
              title="No parking available nearby"
              description="No parking spaces match your search criteria. Try adjusting filters or clearing your query."
              onAction={() => {
                setSearchInput('');
                setSelectedCity('All');
                setOnlyAvailable(false);
              }}
              actionText="Reset Filters"
            />
          ) : (
            filteredLocations.map((loc) => {
              const isSelected = selectedLocation?.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className="clean-card"
                  style={{
                    padding: '1.15rem',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--card-border)',
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--surface)',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text)' }}>{loc.name}</h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <MapPin size={13} color="var(--primary)" /> {loc.address} ({loc.distance})
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)' }}>₹{loc.pricePerHour}/hr</div>
                      <div className={`badge ${loc.availableSlots > 0 ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.7rem' }}>
                        {loc.availableSlots} free
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {loc.amenities?.slice(0, 3).map((am, i) => (
                      <span key={i} className="badge badge-muted" style={{ fontSize: '0.7rem' }}>
                        {am}
                      </span>
                    ))}
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      ⭐ {loc.rating} ({loc.reviewsCount || 100})
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <Link to={`/parking/${loc.id}`} style={{ flex: 1, textDecoration: 'none' }} onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" size="sm" fullWidth>
                        View Details
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

        {/* RIGHT PANEL: Interactive Map */}
        <div style={{ height: '100%', minHeight: '450px' }}>
          <InteractiveMap
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            onSelectLocation={(loc) => setSelectedLocation(loc)}
            height="100%"
          />
        </div>
      </div>

      {/* Booking Modal */}
      {bookingLoc && (
        <BookingModal
          location={bookingLoc}
          isOpen={!!bookingLoc}
          onClose={() => setBookingLoc(null)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .find-parking-dual { grid-template-columns: 1fr !important; height: auto !important; }
        }
      `}</style>
    </div>
  );
};

export default FindParking;
