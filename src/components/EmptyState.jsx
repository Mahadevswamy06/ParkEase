import React from 'react';
import { Inbox } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = Inbox,
  title = "No results found",
  description = "We couldn't find anything matching your request. Try adjusting your filters or search criteria.",
  actionLabel,
  onAction
}) => {
  return (
    <div style={{
      padding: '3.5rem 1.5rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 'var(--radius-lg)',
      border: '1px border var(--border)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#F1F5F9',
        color: 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <Icon size={32} />
      </div>

      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '420px', marginBottom: actionLabel ? '1.5rem' : 0 }}>
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
