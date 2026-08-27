import React from 'react';

export const CardSkeleton = () => (
  <div className="clean-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
    <div className="skeleton-box" style={{ height: '140px', width: '100%', borderRadius: 'var(--radius-md)' }} />
    <div className="skeleton-box" style={{ height: '20px', width: '70%' }} />
    <div className="skeleton-box" style={{ height: '14px', width: '50%' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
      <div className="skeleton-box" style={{ height: '28px', width: '30%' }} />
      <div className="skeleton-box" style={{ height: '32px', width: '40%', borderRadius: 'var(--radius-md)' }} />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 4 }) => (
  <div className="clean-card" style={{ padding: '1rem', width: '100%' }}>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.85rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="skeleton-box" style={{ height: '20px', width: '20%' }} />
        <div className="skeleton-box" style={{ height: '20px', width: '30%' }} />
        <div className="skeleton-box" style={{ height: '20px', width: '25%' }} />
        <div className="skeleton-box" style={{ height: '20px', width: '15%' }} />
      </div>
    ))}
  </div>
);

export const StatSkeleton = () => (
  <div className="clean-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <div className="skeleton-box" style={{ height: '14px', width: '40%' }} />
    <div className="skeleton-box" style={{ height: '32px', width: '60%' }} />
    <div className="skeleton-box" style={{ height: '12px', width: '50%' }} />
  </div>
);
