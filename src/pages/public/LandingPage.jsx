import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, ArrowRight, ShieldCheck, Zap, QrCode, Smartphone, Award, CheckCircle2 } from 'lucide-react';
import Button from '../../components/Button';
import InteractiveMap from '../../components/common/InteractiveMap';
import { useParking } from '../../context/ParkingContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { locations, setSearchQuery } = useParking();

  const [locationInput, setLocationInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [entryTime, setEntryTime] = useState('10:00 AM');
  const [exitTime, setExitTime] = useState('01:00 PM');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (locationInput) {
      setSearchQuery(locationInput);
    }
    navigate('/parking');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', paddingBottom: '3rem' }}>
      {/* HERO SECTION */}
      <section style={{
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '4rem 1.5rem 3rem'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center'
        }} className="hero-grid">
          
          {/* Hero Left Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="badge badge-primary" style={{ width: 'fit-content' }}>
              <Zap size={14} /> Smart Parking SaaS Engine
            </div>

            <h1 style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: 'var(--text)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em'
            }}>
              Find parking before you arrive.
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6
            }}>
              Discover nearby parking spaces, compare prices, reserve your spot, and park without the stress.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
              <Button variant="primary" size="lg" onClick={() => navigate('/parking')} icon={Search}>
                Find Parking
              </Button>
              <a href="#how-it-works" style={{ textDecoration: 'none' }}>
                <Button variant="outline" size="lg">
                  How it works
                </Button>
              </a>
            </div>

            {/* Quick Metrics */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border)'
            }}>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)' }}>50+</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Indian Cities</div>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)' }}>99.8%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ANPR Accuracy</div>
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)' }}>100%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Digital Passes</div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Map Card */}
          <div className="clean-card" style={{ padding: '0.75rem', height: '420px' }}>
            <InteractiveMap locations={locations.slice(0, 5)} height="100%" />
          </div>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 1.5rem' }}>
        <div className="clean-card" style={{ padding: '1.75rem', boxShadow: 'var(--shadow-lg)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1.25rem' }}>
            Where do you want to park?
          </h2>

          <form onSubmit={handleSearchSubmit} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
            gap: '1rem',
            alignItems: 'end'
          }} className="search-form-grid">
            
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Location or City
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="e.g. Whitefield, BKC Mumbai, Connaught Place"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.4rem' }}
                />
                <MapPin size={18} color="var(--primary)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Entry Time
              </label>
              <select value={entryTime} onChange={(e) => setEntryTime(e.target.value)} style={{ width: '100%' }}>
                <option value="08:00 AM">08:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="06:00 PM">06:00 PM</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Exit Time
              </label>
              <select value={exitTime} onChange={(e) => setExitTime(e.target.value)} style={{ width: '100%' }}>
                <option value="11:00 AM">11:00 AM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="08:00 PM">08:00 PM</option>
                <option value="10:00 PM">10:00 PM</option>
              </select>
            </div>

            <Button type="submit" variant="primary" size="md" icon={Search} style={{ height: '42px' }}>
              Search Parking
            </Button>
          </form>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Simple Steps</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>How ParkEase Works</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Reserve guaranteed parking in 3 easy steps</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="steps-grid">
          
          <div className="clean-card" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem' }}>
              1
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>Find</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Search nearby parking garages in Bengaluru, Mumbai, Delhi, and more. Compare hourly rates and live available slots.
            </p>
          </div>

          <div className="clean-card" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem' }}>
              2
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>Reserve</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Select entry time, vehicle plate number, and preferred parking slot. Pay seamlessly via UPI, Cards, or Netbanking.
            </p>
          </div>

          <div className="clean-card" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem' }}>
              3
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)' }}>Park</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Drive straight to your assigned bay. High-speed ANPR optical camera auto-detects your plate and opens barrier.
            </p>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ backgroundColor: 'var(--surface)', padding: '4rem 1.5rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>Engineered for Driver Peace of Mind</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="features-grid">
            {[
              { title: 'Real-Time Availability', desc: 'Live IoT bay sensor telemetry updates slot counts every few seconds so you never arrive at a full garage.', icon: Zap },
              { title: 'Easy Reservations', desc: 'Pre-book your spot up to 7 days in advance with instant slot confirmation.', icon: Calendar },
              { title: 'Secure Payments', desc: 'Abstracted PCI-DSS compliant checkout supporting UPI, GPay, Paytm, and Credit Cards.', icon: ShieldCheck },
              { title: 'Digital Parking Pass', desc: 'Instant pass generation with QR code and assigned bay details sent to your phone.', icon: QrCode },
              { title: 'Smart Navigation', desc: '1-click turn-by-turn navigation redirecting directly to garage entry gates.', icon: MapPin },
              { title: 'Booking History', desc: 'Track active sessions, past receipts, and download GST tax invoices anytime.', icon: Smartphone }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="clean-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 1.5rem' }}>
        <div className="clean-card" style={{
          padding: '3.5rem 2rem',
          backgroundColor: 'var(--primary)',
          color: '#FFFFFF',
          textAlign: 'center',
          borderRadius: 'var(--radius-xl)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem'
        }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800 }}>Ready to park without the stress?</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px' }}>
            Find guaranteed parking spaces near your destination in under 30 seconds.
          </p>
          <Button variant="secondary" size="lg" onClick={() => navigate('/parking')} style={{ backgroundColor: '#FFFFFF', color: 'var(--primary)', marginTop: '0.5rem' }}>
            Find Parking Now <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .search-form-grid { grid-template-columns: 1fr !important; }
          .steps-grid, .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
