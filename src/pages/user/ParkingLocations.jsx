import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Star, Clock, Car, Filter, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import FilterPanel from '../../components/FilterPanel';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { useParking } from '../../context/ParkingContext';
import { formatCurrency } from '../../utils/formatters';

const ParkingLocations = () => {
  const [searchParams] = useSearchParams();
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
    setSelectedAmenity
  } = useParking();

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // If URL query has city
    const urlCity = searchParams.get('city');
    if (urlCity) {
      setSelectedCity(urlCity);
    }
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchParams, setSelectedCity]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setMaxPrice(250);
    setOnlyAvailable(false);
    setSelectedAmenity('All');
    setCurrentPage(1);
  };

  // Pagination Math
  const totalPages = Math.ceil(filteredLocations.length / itemsPerPage) || 1;
  const paginatedLocations = filteredLocations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="parking-locations-page animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>Parking Locations</h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Discover available garages, compare live hourly pricing, and reserve guaranteed spots.
        </p>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 300px) 1fr', gap: '2rem' }}>
        {/* Left Filters Sidebar */}
        <aside className="filter-sidebar">
          <FilterPanel
            selectedCity={selectedCity}
            onCityChange={(c) => { setSelectedCity(c); setCurrentPage(1); }}
            maxPrice={maxPrice}
            onPriceChange={(p) => { setMaxPrice(p); setCurrentPage(1); }}
            onlyAvailable={onlyAvailable}
            onAvailabilityChange={(a) => { setOnlyAvailable(a); setCurrentPage(1); }}
            selectedAmenity={selectedAmenity}
            onAmenityChange={(am) => { setSelectedAmenity(am); setCurrentPage(1); }}
            onReset={handleResetFilters}
          />
        </aside>

        {/* Right Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Top Search Bar */}
          <SearchBar
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search by lot name, street, or city..."
          />

          {/* Results Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <span>Showing <strong>{filteredLocations.length}</strong> parking location{filteredLocations.length === 1 ? '' : 's'}</span>
            {(searchQuery || selectedCity !== 'All' || maxPrice < 25 || onlyAvailable || selectedAmenity !== 'All') && (
              <button
                onClick={handleResetFilters}
                style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem' }}
              >
                Clear active filters
              </button>
            )}
          </div>

          {/* Locations Grid */}
          {loading ? (
            <LoadingSkeleton type="card" count={4} />
          ) : paginatedLocations.length === 0 ? (
            <EmptyState
              title="No parking lots match your filter criteria"
              description="Try adjusting your maximum hourly rate, selected city, or resetting active filters."
              actionLabel="Reset All Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {paginatedLocations.map((loc) => (
                <Card key={loc.id} hoverable={true} padding="none">
                  {/* Image & Status Badge */}
                  <div style={{ position: 'relative', height: '190px' }}>
                    <img
                      src={loc.image}
                      alt={loc.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '0.5rem' }}>
                      <StatusBadge status={loc.isOpen ? "open" : "closed"}>
                        {loc.isOpen ? "Open" : "Closed"}
                      </StatusBadge>
                    </div>

                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.75)',
                      backdropFilter: 'blur(4px)',
                      color: '#FFFFFF',
                      padding: '0.3rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <MapPin size={13} color="#BFDBFE" />
                      {loc.distance}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{loc.name}</h3>
                        <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{loc.address}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', backgroundColor: '#FFFBEB', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid #FDE68A' }}>
                        <Star size={14} fill="#F59E0B" color="#F59E0B" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#B45309' }}>{loc.rating}</span>
                      </div>
                    </div>

                    {/* Amenities tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {loc.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} style={{
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          backgroundColor: '#F1F5F9',
                          color: 'var(--text-secondary)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px'
                        }}>
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Slots Info & Price Footer */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--border)',
                      marginTop: '0.25rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                          {formatCurrency(loc.pricePerHour)}
                          <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/hr</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: loc.availableSlots > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
                          {loc.availableSlots} / {loc.totalSlots} slots available
                        </div>
                      </div>

                      <Link to={`/parking/${loc.id}`}>
                        <Button variant="primary" size="md">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              <Button
                variant="outline"
                size="sm"
                icon={ChevronLeft}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                Prev
              </Button>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', padding: '0 0.75rem' }}>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                icon={ChevronRight}
                iconPosition="right"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 840px) {
          .parking-locations-page > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ParkingLocations;
