import React from 'react';
import { SearchX, Inbox, ArrowRight } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  title = "No results found",
  description = "Try adjusting your search query or clear filters to discover available parking locations.",
  icon: Icon = SearchX,
  actionText,
  onAction
}) => {
  return (
    <div className="clean-card" style={{
      padding: '3rem 2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      margin: '1.5rem 0'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-subtle)',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={28} />
      </div>

      <div style={{ maxWidth: '420px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.35rem' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          {description}
        </p>
      </div>

      {actionText && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} style={{ marginTop: '0.5rem' }}>
          {actionText} <ArrowRight size={14} />
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
