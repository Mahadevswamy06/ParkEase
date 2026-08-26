import React from 'react';
import { Radio, Play, Pause, RefreshCw, Car, Zap, Activity, Clock, MapPin, Sparkles } from 'lucide-react';
import { useParking } from '../context/ParkingContext';

const LiveTelemetryBanner = () => {
  const {
    isLiveFeedActive,
    toggleLiveFeed,
    currentTime,
    liveSensorEvents,
    simulateVehicleEntry,
    simulateVehicleExit,
    locations,
    userLocation,
    fetchUserLiveLocation,
    isGeolocating
  } = useParking();

  const latestEvent = liveSensorEvents[0] || { text: 'IoT Gateway Connected • Monitoring Garages Live', time: currentTime };

  return (
    <div style={{
      backgroundColor: 'var(--card-bg-solid)',
      borderBottom: '1px solid var(--border)',
      padding: '0.45rem 1.5rem',
      fontSize: '0.8rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.75rem',
      transition: 'var(--transition)',
      backdropFilter: 'blur(16px)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Left: Live Status Badge & Clock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: isLiveFeedActive ? 'rgba(239, 68, 68, 0.14)' : 'rgba(100, 116, 139, 0.14)',
          color: isLiveFeedActive ? '#EF4444' : 'var(--text-muted)',
          padding: '0.2rem 0.65rem',
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '0.75rem',
          border: `1px solid ${isLiveFeedActive ? 'rgba(239, 68, 68, 0.35)' : 'var(--border)'}`
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isLiveFeedActive ? '#EF4444' : '#64748B',
            boxShadow: isLiveFeedActive ? '0 0 10px #EF4444' : 'none',
            animation: isLiveFeedActive ? 'pulse 1.5s infinite' : 'none'
          }} />
          {isLiveFeedActive ? 'REAL-TIME IoT FEED: LIVE' : 'FEED PAUSED'}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          <Clock size={14} color="var(--primary)" />
          <span>{currentTime}</span>
        </div>

        {/* Live GPS Button */}
        <button
          onClick={fetchUserLiveLocation}
          disabled={isGeolocating}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-sm)',
            color: userLocation ? '#10B981' : 'var(--primary)',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'var(--transition)'
          }}
        >
          <MapPin size={13} />
          {isGeolocating ? 'Detecting GPS...' : userLocation ? 'GPS Connected' : 'Use My Live GPS'}
        </button>
      </div>

      {/* Middle: Live Event Stream Ticker */}
      <div style={{
        flex: 1,
        minWidth: '240px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'var(--bg)',
        padding: '0.3rem 0.85rem',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
        fontWeight: 500,
        overflow: 'hidden'
      }}>
        <Activity size={14} color="#10B981" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, flexShrink: 0 }}>
          {latestEvent.time}
        </span>
        <span style={{ fontSize: '0.78rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-secondary)' }}>
          {latestEvent.text}
        </span>
      </div>

      {/* Right: Simulation Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <button
          onClick={toggleLiveFeed}
          title={isLiveFeedActive ? "Pause live simulation feed" : "Resume live simulation feed"}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg)',
            color: 'var(--text)',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          {isLiveFeedActive ? <Pause size={13} color="#EF4444" /> : <Play size={13} color="#10B981" />}
          {isLiveFeedActive ? 'Pause' : 'Resume'}
        </button>

        <button
          onClick={() => simulateVehicleEntry(locations[0]?.id)}
          title="Simulate random vehicle arrival"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            backgroundColor: 'rgba(59, 130, 246, 0.12)',
            color: '#3B82F6',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          + Entry Sim
        </button>

        <button
          onClick={() => simulateVehicleExit(locations[0]?.id)}
          title="Simulate vehicle departure"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            color: '#EF4444',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          - Exit Sim
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default LiveTelemetryBanner;
