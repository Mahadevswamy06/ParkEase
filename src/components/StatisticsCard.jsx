import React from 'react';
import Card from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatisticsCard = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  iconBg = 'var(--primary-light)',
  iconColor = 'var(--primary)'
}) => {
  return (
    <Card padding="md" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
          {title}
        </span>
        {Icon && (
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: iconBg,
            color: iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Icon size={22} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
          {value}
        </span>

        {change && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.2rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: changeType === 'positive' ? 'var(--success)' : changeType === 'negative' ? 'var(--danger)' : 'var(--text-muted)'
          }}>
            {changeType === 'positive' && <TrendingUp size={14} />}
            {changeType === 'negative' && <TrendingDown size={14} />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatisticsCard;
