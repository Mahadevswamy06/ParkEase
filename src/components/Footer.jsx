import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShieldCheck, Zap, Headphones, Mail } from 'lucide-react';
import Button from './Button';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--card-bg)',
      borderTop: '1px solid var(--border)',
      marginTop: 'auto',
      color: 'var(--text)'
    }}>
      {/* Top Features Banner */}
      <div style={{
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        padding: '2.5rem 1.5rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Zap size={24} />
            </div>
            <div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Instant Slot Booking</h5>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>Reserve guaranteed Indian parking in 30 seconds.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700 }}>ANPR Automated Barrier</h5>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>Automated Indian plate recognition gates (e.g. DL, MH, KA, TS).</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--warning-light)', color: 'var(--warning)' }}>
              <Headphones size={24} />
            </div>
            <div>
              <h5 style={{ fontSize: '0.95rem', fontWeight: 700 }}>24/7 Concierge Support</h5>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>Round-the-clock Indian city support line.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 1.5rem 2.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2.5rem'
      }}>
        {/* Brand info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}>
              <Car size={20} />
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>ParkEase India</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Next-gen smart parking platform serving New Delhi, Mumbai, Bengaluru, Hyderabad, Kolkata, and Chennai.
          </p>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © 2026 ParkEase Systems India Pvt. Ltd. All rights reserved.
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text)' }}>Platform</h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <li><Link to="/parking">Find Indian Parking Lots</Link></li>
            <li><Link to="/user/dashboard">User Dashboard</Link></li>
            <li><Link to="/admin">Admin Portal</Link></li>
            <li><Link to="/about">System Architecture</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text)' }}>Company</h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text)' }}>Stay Updated</h5>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Subscribe to our product updates and EV network expansions in India.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="email"
              placeholder="Enter email address..."
              style={{
                padding: '0.6rem 0.85rem',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg)',
                color: 'var(--text)',
                outline: 'none',
                flex: 1
              }}
            />
            <Button variant="primary" size="sm" icon={Mail}>
              Join
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
