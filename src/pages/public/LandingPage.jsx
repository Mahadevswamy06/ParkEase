import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Car,
  Search,
  MapPin,
  Calendar,
  Clock,
  Zap,
  Shield,
  Smartphone,
  CheckCircle,
  Star,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Users,
  Award
} from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import { FAQ_DATA, INITIAL_LOCATIONS } from '../../utils/dummyData';
import { formatCurrency } from '../../utils/formatters';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [heroCity, setHeroCity] = useState('New Delhi');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate(`/parking?city=${encodeURIComponent(heroCity)}`);
  };

  return (
    <div className="landing-page animate-fade-in">
      {/* HERO SECTION */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        padding: '4rem 1.5rem 5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* Hero Left Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--primary-border)',
              color: 'var(--primary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              width: 'fit-content'
            }}>
              <Sparkles size={16} />
              <span>Next-Gen Enterprise Smart Parking</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 800,
              color: 'var(--text)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em'
            }}>
              Find and Book Parking in <span style={{ color: 'var(--primary)' }}>Seconds</span>
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '540px'
            }}>
              Guaranteed smart parking spots with automated barrier gate access, EV supercharging stations, and real-time occupancy tracking across major urban centers.
            </p>

            {/* Quick Hero Search Widget */}
            <form onSubmit={handleHeroSearch} style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: '0.75rem',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginTop: '0.5rem'
            }}>
              <div style={{ flex: 1, minWidth: '160px', display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.5rem' }}>
                <MapPin size={20} color="var(--primary)" />
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Location</span>
                  <select
                    value={heroCity}
                    onChange={(e) => setHeroCity(e.target.value)}
                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', cursor: 'pointer' }}
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

              <div style={{ width: '1px', backgroundColor: 'var(--border)', margin: '0.25rem 0' }} />

              <div style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.5rem' }}>
                <Clock size={20} color="var(--primary)" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Access</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>Immediate / 24/7</span>
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" icon={Search} style={{ minWidth: '140px' }}>
                Find Parking
              </Button>
            </form>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
              <Link to="/parking">
                <Button variant="secondary" size="md" icon={ArrowRight} iconPosition="right">
                  Explore Locations
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" size="md">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Right Visual Mockup */}
          <div style={{ position: 'relative' }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-xl)',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img
                src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1000&q=80"
                alt="Smart Parking System"
                style={{ width: '100%', height: '360px', objectFit: 'cover' }}
              />
              
              {/* Overlay Interactive Mock Card */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <StatusBadge status="available" dot={true}>14 Slots Available</StatusBadge>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>• Connaught Central Deck</span>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)' }}>
                    ₹80.00 <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/ hour</span>
                  </div>
                </div>

                <Link to="/parking">
                  <Button variant="primary" size="sm">
                    Reserve Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED LOCATIONS CAROUSEL PREVIEW */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>Popular Parking Hubs</h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Explore high-demand garages with real-time slot availability</p>
          </div>
          <Link to="/parking">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
              View All Locations
            </Button>
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {INITIAL_LOCATIONS.slice(0, 3).map((loc) => (
            <Card key={loc.id} hoverable={true} padding="none">
              <div style={{ position: 'relative' }}>
                <img src={loc.image} alt={loc.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  <StatusBadge status={loc.isOpen ? "open" : "closed"}>
                    {loc.isOpen ? "Open Now" : "Closed"}
                  </StatusBadge>
                </div>
              </div>
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>{loc.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.85rem', fontWeight: 700, color: '#D97706' }}>
                    <Star size={15} fill="#F59E0B" color="#F59E0B" />
                    <span>{loc.rating}</span>
                  </div>
                </div>
                
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={15} color="var(--primary)" />
                  {loc.address} ({loc.distance})
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                  <div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>{formatCurrency(loc.pricePerHour)}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>/hr</span>
                  </div>
                  <Link to={`/parking/${loc.id}`}>
                    <Button variant="primary" size="sm">Book Spot</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SYSTEM FEATURES SECTION */}
      <section style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text)' }}>Built for Modern Urban Mobility</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Engineered with precision hardware integrations and intelligent cloud management for frictionless parking.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <Card padding="lg">
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: '#EFF6FF', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Zap size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Live Slot Grid & Sensors</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Ultrasonic sensors track spot status live. Select your exact spot floor-by-floor before you even leave home.
              </p>
            </Card>

            <Card padding="lg">
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: '#F0FDF4', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Shield size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>ANPR License Gate Access</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Automatic license plate readers scan your registered vehicle for instant barrier lifting without paper tickets.
              </p>
            </Card>

            <Card padding="lg">
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: '#FFFBEB', color: 'var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Smartphone size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Remote Extensions</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Running late in a meeting? Extend your active parking duration with a single tap from your personal dashboard.
              </p>
            </Card>

            <Card padding="lg">
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: '#F3E8FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Award size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>EV Smart Hub Support</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Dedicated EV slots equipped with high-speed charging. Reserve charging slots alongside standard parking.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text)' }}>How It Works</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>Four effortless steps from search to seamless park.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {[
            { step: "01", title: "Search Location", desc: "Filter by city, amenities, price, or distance." },
            { step: "02", title: "Pick Exact Slot", desc: "Choose your preferred slot on our visual grid floor plan." },
            { step: "03", title: "Automatic Access", desc: "Barriers lift automatically as ANPR cameras read your plate." },
            { step: "04", title: "Seamless Checkout", desc: "Digital receipt sent to email with automatic payment billing." }
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-border)', position: 'absolute', top: '15px', right: '20px' }}>
                {item.step}
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', marginTop: '1rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text)' }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Everything you need to know about ParkEase reservations.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div key={idx} style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FFFFFF',
                  overflow: 'hidden',
                  transition: 'var(--transition)'
                }}>
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      color: 'var(--text)'
                    }}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.25rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, borderTop: '1px solid #F1F5F9' }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
