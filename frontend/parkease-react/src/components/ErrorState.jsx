import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

const ErrorState = ({
  title = "Unable to load data",
  description = "A temporary network issue occurred. Please check your internet connection and try again.",
  onRetry
}) => {
  return (
    <div className="clean-card" style={{
      padding: '2.5rem 1.5rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.85rem',
      backgroundColor: 'var(--danger-light)',
      borderColor: 'var(--danger-border)'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#FEE2E2',
        color: 'var(--danger)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AlertTriangle size={24} />
      </div>

      <div style={{ maxWidth: '400px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--danger)', marginBottom: '0.25rem' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {description}
        </p>
      </div>

      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry} icon={RefreshCw}>
          Retry Connection
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
