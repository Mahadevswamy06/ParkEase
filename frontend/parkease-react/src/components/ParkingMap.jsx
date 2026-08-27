import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Zap, CheckCircle2 } from 'lucide-react';

const ParkingMap = ({ locations = [], userLocation = null, selectedLocation = null, onSelectLocation = () => {} }) => {
  const [activeSpot, setActiveSpot] = useState(selectedLocation);

  useEffect(() => {
    if (selectedLocation) {
      setActiveSpot(selectedLocation);
    }
  }, [selectedLocation]);

  const getMarkerColor = (avail, total) => {
    if (avail === 0) return '#EF4444'; // Red - Full
    const ratio = avail / (total || 1);
    if (ratio < 0.2) return '#F59E0B'; // Orange - Limited
    return '#22C55E'; // Green - Available
  };

  const handleOpenDirections = (lat, lng, name) => {
    const destination = `${lat},${lng}`;
    const url = userLocation
      ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${destination}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + destination)}`;
    window.open(url, '_blank');
  };

  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="clean-card" style={{ overflow: 'hidden', position: 'relative', minHeight: '420px', borderRadius: 'var(--radius-lg)' }}>
      {/* Map Control Bar Header */}
      <div style={{
        padding: '0.85rem 1.25rem',
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 5
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Compass size={18} color="var(--primary)" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>
            Google Maps Telemetry View
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', fontWeight: 600 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#22C55E' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
            Available (≥20%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#F59E0B' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
            Limited (&lt;20%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#EF4444' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
            Full (0)
          </span>
        </div>
      </div>

      {/* Map Body Area */}
      <div style={{
        height: '400px',
        backgroundColor: 'var(--bg-subtle)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}>
        {/* User Location Pulse Marker */}
        {userLocation && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '48%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: '#2563EB',
              border: '3px solid #FFFFFF',
              boxShadow: '0 0 12px rgba(37, 99, 235, 0.8)'
            }} />
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              backgroundColor: 'var(--surface)',
              padding: '2px 6px',
              borderRadius: '4px',
              border: '1px solid var(--border)',
              marginTop: '4px',
              boxShadow: 'var(--shadow-xs)'
            }}>
              Your Location
            </span>
          </div>
        )}

        {/* Interactive Parking Markers */}
        {locations.map((loc, idx) => {
          const color = getMarkerColor(loc.availableSlots, loc.totalSlots);
          const topPos = `${25 + ((idx * 27) % 55)}%`;
          const leftPos = `${18 + ((idx * 23) % 65)}%`;

          return (
            <button
              key={loc.id}
              onClick={() => {
                setActiveSpot(loc);
                onSelectLocation(loc);
              }}
              style={{
                position: 'absolute',
                top: topPos,
                left: leftPos,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                zIndex: activeSpot?.id === loc.id ? 20 : 12,
                transition: 'transform 0.2s ease'
              }}
            >
              <div style={{
                backgroundColor: color,
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 800,
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: activeSpot?.id === loc.id ? '2px solid #FFFFFF' : 'none',
                transform: activeSpot?.id === loc.id ? 'scale(1.15)' : 'scale(1)'
              }}>
                <MapPin size={12} />
                <span>₹{loc.pricePerHour}/h</span>
                <span style={{ backgroundColor: 'rgba(0,0,0,0.25)', padding: '1px 5px', borderRadius: '10px' }}>
                  {loc.availableSlots}
                </span>
              </div>
            </button>
          );
        })}

        {/* Selected Marker Popup Overlay */}
        {activeSpot && (
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            maxWidth: '380px',
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border)',
            zIndex: 30
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text)' }}>{activeSpot.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{activeSpot.address}</div>
              </div>
              <button
                onClick={() => setActiveSpot(null)}
                style={{ background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', margin: '0.75rem 0', fontSize: '0.8rem', fontWeight: 700 }}>
              <span style={{ color: getMarkerColor(activeSpot.availableSlots, activeSpot.totalSlots) }}>
                🟢 {activeSpot.availableSlots} / {activeSpot.totalSlots} slots available
              </span>
              <span style={{ color: 'var(--primary)' }}>₹{activeSpot.pricePerHour}/hour</span>
              {activeSpot.distance && <span>📏 {activeSpot.distance} km away</span>}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => onSelectLocation(activeSpot)}
                className="btn-primary"
                style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem' }}
              >
                Book Now
              </button>
              <button
                onClick={() => handleOpenDirections(activeSpot.latitude, activeSpot.longitude, activeSpot.name)}
                className="btn-outline"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
              >
                <Navigation size={14} /> Directions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingMap;
