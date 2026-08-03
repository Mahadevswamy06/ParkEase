import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Home, ArrowLeft } from 'lucide-react';
import Button from '../../components/Button';

const NotFoundPage = () => {
  return (
    <div style={{
      minHeight: 'calc(100vh - 140px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      textAlign: 'center'
    }} className="animate-fade-in">
      <div style={{ maxWidth: '440px' }}>
        <div style={{
          fontSize: '5rem',
          fontWeight: 900,
          color: 'var(--primary)',
          lineHeight: 1,
          marginBottom: '0.5rem',
          letterSpacing: '-0.05em'
        }}>
          404
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem' }}>
          Parking Spot Not Found
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The page or parking reservation link you followed does not exist or has been moved.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <Link to="/">
            <Button variant="primary" icon={Home}>
              Back to Home
            </Button>
          </Link>
          <Link to="/parking">
            <Button variant="secondary" icon={Car}>
              Find Parking
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
