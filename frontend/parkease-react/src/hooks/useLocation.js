import { useState, useCallback } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setLocation(coords);
        setLoading(false);
      },
      (err) => {
        let msg = 'Failed to retrieve location.';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Defaulting to Pune Metro Center.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = 'Location information is unavailable.';
        } else if (err.code === err.TIMEOUT) {
          msg = 'The request to get user location timed out.';
        }
        setError(msg);
        setLoading(false);
        // Fallback default: Pune center (18.5204, 73.8567)
        setLocation({ lat: 18.5204, lng: 73.8567 });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, []);

  return { location, loading, error, getCurrentLocation };
};
