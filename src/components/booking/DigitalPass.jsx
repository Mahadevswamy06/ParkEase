import React from 'react';
import { QrCode, Navigation, Download, Share2, AlertCircle, CheckCircle, Clock, MapPin, Car } from 'lucide-react';
import Button from '../Button';

const DigitalPass = ({ booking, onCancel }) => {
  if (!booking) return null;

  const handleDownload = () => {
    alert(`Downloading ParkEase Pass PDF for booking ${booking.bookingCode || booking.id}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `ParkEase Pass - ${booking.parkingName}`,
        text: `My ParkEase reservation at ${booking.parkingName}, Slot: ${booking.slotId}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Pass link copied to clipboard!');
    }
  };

  const handleNavigate = () => {
    const query = encodeURIComponent(`${booking.parkingName} ${booking.address || ''}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="clean-card" style={{
      maxWidth: '480px',
      margin: '0 auto',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--border)'
    }}>
      {/* Header Pass Banner */}
      <div style={{
        backgroundColor: 'var(--primary)',
        color: '#FFFFFF',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.85 }}>
            Digital Parking Pass
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800 }}>ParkEase</div>
        </div>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '4px 10px',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          backdropFilter: 'blur(4px)'
        }}>
          #{booking.bookingCode || booking.id}
        </div>
      </div>

      {/* Body Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: 'var(--surface)' }}>
        {/* QR Code Section */}
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          border: '1px dashed var(--border)'
        }}>
          {/* Simulated High-Res QR SVG */}
          <div style={{
            width: '140px',
            height: '140px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <path d="M0 0h30v30H0zM40 0h20v10H40zM70 0h30v30H70zM10 10h10v10H10zM80 10h10v10H80zM0 40h10v20H0zM20 40h20v10H20zM50 40h20v20H50zM80 40h20v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 70h10v30H40zM60 80h20v10H60zM90 70h10v30H90z" fill="#0F172A" />
            </svg>
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Scan at Entrance Kiosk
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            "Show this pass at the entrance or ANPR auto-scan"
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Parking Location</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{booking.parkingName}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{booking.address}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Assigned Slot</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>{booking.slotId || 'A12'}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: 600 }}>Reserved & Ready</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Vehicle Number</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{booking.vehicleNumber}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reservation Date</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{booking.date}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Entry Time</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{booking.startTime}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Exit Time</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{booking.endTime || 'Flexible'}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginTop: '0.5rem' }}>
          <Button variant="primary" size="sm" onClick={handleNavigate} icon={Navigation}>
            Navigate
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} icon={Download}>
            Download PDF
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <Button variant="ghost" size="sm" onClick={handleShare} icon={Share2} style={{ flex: 1 }}>
            Share Pass
          </Button>
          {booking.status !== 'cancelled' && onCancel && (
            <Button variant="ghost" size="sm" onClick={() => onCancel(booking.id)} style={{ color: 'var(--danger)' }}>
              Cancel Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalPass;
