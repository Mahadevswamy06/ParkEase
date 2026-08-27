import React from 'react';

const SkeletonBox = ({ width = '100%', height = '20px', borderRadius = 'var(--radius-sm)', style = {} }) => (
  <div style={{
    width,
    height,
    borderRadius,
    backgroundColor: '#E2E8F0',
    animation: 'pulseGlow 1.5s ease-in-out infinite',
    ...style
  }} />
);

const LoadingSkeleton = ({ type = 'card', count = 3 }) => {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {items.map((_, i) => (
          <div key={i} style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <SkeletonBox height="180px" borderRadius="var(--radius-md)" />
            <SkeletonBox width="70%" height="24px" />
            <SkeletonBox width="50%" height="16px" />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              <SkeletonBox width="35%" height="20px" />
              <SkeletonBox width="40%" height="36px" borderRadius="var(--radius-md)" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <SkeletonBox width="25%" height="32px" />
          <SkeletonBox width="25%" height="32px" />
          <SkeletonBox width="25%" height="32px" />
          <SkeletonBox width="25%" height="32px" />
        </div>
        {items.map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <SkeletonBox width="20%" height="24px" />
            <SkeletonBox width="30%" height="24px" />
            <SkeletonBox width="25%" height="24px" />
            <SkeletonBox width="25%" height="24px" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items.map((_, i) => (
        <SkeletonBox key={i} height="40px" />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
