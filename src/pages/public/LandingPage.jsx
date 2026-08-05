import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  Search,
  ShieldCheck,
  Zap,
  CreditCard,
  Headphones,
  CheckCircle2,
  Star,
  Heart,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { INITIAL_LOCATIONS } from '../../utils/dummyData';
import { formatCurrency } from '../../utils/formatters';

const LandingPage = () => {
  const navigate = useNavigate();

  // Search Bar State
  const [selectedCity, setSelectedCity] = useState('New Delhi');
  const [vehicleType, setVehicleType] = useState('Car');
  const [dateTime, setDateTime] = useState('Today, Now');

  // Favorites Toggle State
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/parking?city=${encodeURIComponent(selectedCity)}`);
  };

  return (
    <div className="landing-page" style={{ overflowX: 'hidden' }}>
      
      {/* =========================================
          HERO SECTION (Cinematic Cyberpunk Style)
         ========================================= */}
      <section style={{
        position: 'relative',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        padding: '4rem 1.5rem 6rem',
        maxWidth: '1380px',
        margin: '0 auto'
      }}>
        {/* Ambient Glowing Background Blobs */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{
          position: 'absolute',
          bottom: '5%',
          right: '-5%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          
          {/* Left Column Content */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--primary-light)',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              color: 'var(--primary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              boxShadow: '0 0 15px rgba(124, 58, 237, 0.2)'
            }}>
              <Sparkles size={16} />
              <span>Next-Generation Parking Solution</span>
            </div>

            {/* Heading */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
              color: 'var(--text)'
            }}>
              Smart Parking.<br />
              <span className="text-gradient-primary">Smarter Cities.</span>
            </h1>

            {/* Description */}
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '540px'
            }}>
              Reserve guaranteed smart parking spots instantly across top Indian cities. Powered by AI slot allocation, real-time telemetry, and contactless ANPR barrier pass gates.
            </p>

            {/* Call to Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <Link to="/parking">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-gradient"
                  style={{
                    padding: '0.9rem 2rem',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}
                >
                  <Search size={18} />
                  <span>Find Parking Now</span>
                </motion.button>
              </Link>

              <a href="#how-it-works">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    padding: '0.9rem 2rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--text)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    backdropFilter: 'blur(12px)'
                  }}
                >
                  How It Works
                </motion.button>
              </a>
            </div>

            {/* 4 Feature Highlights Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.85rem 1.5rem',
              maxWidth: '500px',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border)'
            }}>
              {[
                { label: 'Real-time Availability', icon: Zap },
                { label: 'Secure Booking', icon: ShieldCheck },
                { label: 'Multiple Payment', icon: CreditCard },
                { label: '24/7 Support', icon: Headphones }
              ].map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="var(--success)" />
                    <span>{feat.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Floating Illustration Card & Live Statistics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            {/* Floating Main Luxury Car / Entrance Graphic Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-card"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--radius-xl)',
                padding: '1.25rem',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Sports Electric Car"
                style={{
                  width: '100%',
                  height: '340px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-lg)'
                }}
              />

              {/* Overlay Neon Badge on Hero Image */}
              <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(12px)',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)', boxShadow: '0 0 10px var(--success)' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>ANPR BARRIER LIVE</span>
              </div>
            </motion.div>

            {/* Floating Live Statistics Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="glass-card"
              style={{
                position: 'absolute',
                bottom: '-2rem',
                right: '-1rem',
                padding: '1.25rem 1.5rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(124, 58, 237, 0.4)',
                boxShadow: 'var(--shadow-lg)',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.25rem 2rem',
                minWidth: '280px'
              }}
            >
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--accent)' }}>500+</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Parking Locations</div>
              </div>

              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F472B6' }}>50K+</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Drivers</div>
              </div>

              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--success)' }}>1M+</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Bookings Done</div>
              </div>

              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--warning)' }}>98%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Satisfaction</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* =========================================
          SEARCH PANEL SECTION (Glass Search Card)
         ========================================= */}
      <section style={{ maxWidth: '1200px', margin: '-2rem auto 5rem', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card"
          style={{
            padding: '1.75rem 2rem',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <form onSubmit={handleSearchSubmit} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto',
            gap: '1.25rem',
            alignItems: 'end'
          }}>
            {/* Field 1: Location */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                City Location
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 2.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="New Delhi">New Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
            </div>

            {/* Field 2: Vehicle Type */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Vehicle Type
              </label>
              <div style={{ position: 'relative' }}>
                <Car size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 2.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none',
                    appearance: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Car">Sedan / SUV Car</option>
                  <option value="EV">Electric Vehicle (EV Charging)</option>
                  <option value="TwoWheeler">Two-Wheeler / Bike</option>
                </select>
              </div>
            </div>

            {/* Field 3: Date & Time */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Date & Duration
              </label>
              <div style={{ position: 'relative' }}>
                <Calendar size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                <input
                  type="text"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  placeholder="Today, 2 Hours"
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 2.75rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Search Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-gradient"
              style={{
                padding: '0.85rem 2rem',
                fontSize: '0.95rem',
                height: '46px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Search size={18} />
              <span>Search Spots</span>
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* =========================================
          POPULAR LOCATIONS SECTION
         ========================================= */}
      <section style={{ maxWidth: '1380px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              Prime Indian Garages
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text)' }}>
              Popular Parking Locations
            </h2>
          </div>
          <Link to="/parking" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Explore All 500+ Garages <ArrowRight size={16} />
          </Link>
        </div>

        {/* Location Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {INITIAL_LOCATIONS.map((loc) => (
            <motion.div
              key={loc.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="glass-card"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Image Container with Zoom and Favorite Button */}
              <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                <img
                  src={loc.image}
                  alt={loc.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
                
                {/* Available Slots Badge */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <StatusBadge status={loc.availableSlots > 10 ? 'available' : 'filling'} dot={true}>
                    {loc.availableSlots} Slots Available
                  </StatusBadge>
                </div>

                {/* Favorite Heart Toggle Icon Button */}
                <button
                  onClick={(e) => toggleFavorite(loc.id, e)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: favorites[loc.id] ? '#EF4444' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  <Heart size={18} fill={favorites[loc.id] ? '#EF4444' : 'none'} />
                </button>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text)' }}>{loc.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '2px' }}>
                      <MapPin size={14} color="var(--primary)" /> {loc.city} • {loc.distance}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', backgroundColor: 'var(--warning-light)', color: 'var(--warning)', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
                    <Star size={13} fill="var(--warning)" />
                    <span>{loc.rating || 4.8}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid var(--border)' }}>
                  <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text)' }}>{formatCurrency(loc.hourlyRate)}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}> / hr</span>
                  </div>

                  <Link to={`/parking/${loc.id}`}>
                    <Button variant="primary" size="sm">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================
          HOW IT WORKS SECTION
         ========================================= */}
      <section id="how-it-works" style={{ maxWidth: '1380px', margin: '0 auto 6rem', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
            Seamless 3-Step Process
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text)' }}>
            How ParkEase Works
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { step: '01', title: 'Search & Reserve', desc: 'Select your preferred Indian city garage, filter by EV charging or price, and pick your exact slot.' },
            { step: '02', title: 'ANPR Gate Pass', desc: 'Drive directly to the entrance. ANPR optical camera reads your vehicle plate and opens the barrier automatically.' },
            { step: '03', title: 'Park & Go', desc: 'Enjoy guaranteed stress-free parking with live session extension directly from your smartphone.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="glass-card"
              style={{ padding: '2rem 1.75rem', borderRadius: 'var(--radius-lg)', position: 'relative' }}
            >
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', opacity: 0.8, marginBottom: '0.75rem' }}>
                {item.step}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
