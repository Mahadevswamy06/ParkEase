import React from 'react';
import { Shield, Zap, Award, Users, CheckCircle, Cpu, Server, Lock } from 'lucide-react';
import Card from '../../components/Card';

const AboutPage = () => {
  return (
    <div className="about-page animate-fade-in" style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          About ParkEase System
        </span>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--text)', marginTop: '0.5rem', letterSpacing: '-0.02em' }}>
          Reinventing Parking Infrastructure with Cloud Intelligence
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: 1.6 }}>
          ParkEase bridges real-world parking hardware with enterprise cloud SaaS, empowering drivers with instant slot availability and venue operators with complete revenue automation.
        </p>
      </div>

      {/* Tech Architecture Stack Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <Card padding="lg">
          <Cpu size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>IoT Sensor Grid</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Overhead ultrasonic and optical camera sensors track individual slot states in real-time, feeding low-latency telemetry to our edge gateways.
          </p>
        </Card>

        <Card padding="lg">
          <Server size={32} color="var(--success)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>High-Speed Reservation Engine</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Handles thousands of simultaneous slot searches, prevents double-booking race conditions, and syncs instant barrier gate credentials.
          </p>
        </Card>

        <Card padding="lg">
          <Lock size={32} color="var(--warning)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Enterprise Security & ANPR</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            End-to-end encrypted vehicle recognition system with zero friction for drivers. Automated plate scanning for seamless gate opening.
          </p>
        </Card>
      </div>

      {/* Mission Section */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        padding: '3rem',
        boxShadow: 'var(--shadow-md)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>Our Core Mission</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Urban congestion costs drivers hundreds of hours and millions of gallons of fuel every year spent hunting for open parking. ParkEase solves this by providing guaranteed reservation transparency.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {["Zero ticket queueing with ANPR barriers", "Guaranteed slot reservation prior to arrival", "Integrated EV Supercharger slot allocation", "Comprehensive Admin analytics for lot owners"].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>
                <CheckCircle size={18} color="var(--success)" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          backgroundColor: '#F8FAFC',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary)' }}>99.98%</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Barrier Access Uptime</div>
          </div>
          <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
          <div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--success)' }}>1.4 Million+</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Succesful Bookings Completed</div>
          </div>
          <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
          <div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text)' }}>180+</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Enterprise Garages Connected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
