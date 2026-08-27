// ParkEase REST API Parking Service
import { INITIAL_LOCATIONS } from '../data/demoData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

let locationsCache = (() => {
  try {
    const saved = localStorage.getItem('parkease_locations');
    return saved ? JSON.parse(saved) : INITIAL_LOCATIONS;
  } catch (e) {
    return INITIAL_LOCATIONS;
  }
})();

const saveCache = () => {
  try {
    localStorage.setItem('parkease_locations', JSON.stringify(locationsCache));
  } catch (e) {
    console.error('Failed to save parking locations to localStorage', e);
  }
};

export const parkingService = {
  async getLocations() {
    try {
      const response = await fetch(`${API_BASE_URL}/parking`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          // Normalize backend fields if necessary
          return data.map(item => ({
            ...item,
            rating: item.rating || 4.8,
            reviewsCount: item.reviewsCount || 42,
            image: item.image || 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
            amenities: item.amenities || ['24/7 Security', 'EV Charging', 'ANPR Gate'],
            sensorStatus: 'ONLINE'
          }));
        }
      }
    } catch (error) {
      console.warn('Backend /api/parking unavailable, falling back to local dataset cache:', error.message);
    }
    return [...locationsCache];
  },

  async getLocationById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/parking/${id}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn(`Backend /api/parking/${id} failed, using local cache fallback:`, error.message);
    }
    const found = locationsCache.find(l => String(l.id) === String(id));
    if (!found) throw new Error(`Parking location ${id} not found`);
    return { ...found };
  },

  async getNearbyParking(lat, lng) {
    try {
      const response = await fetch(`${API_BASE_URL}/parking/nearby?lat=${lat}&lng=${lng}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Backend /api/parking/nearby failed, calculating client-side Haversine distance fallback:', error.message);
    }

    // Client-side fallback Haversine distance calculation
    const R = 6371; // Earth radius in km
    return locationsCache.map(loc => {
      const dLat = (loc.latitude - lat) * (Math.PI / 180);
      const dLon = (loc.longitude - lng) * (Math.PI / 180);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat * (Math.PI / 180)) * Math.cos(loc.latitude * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = Math.round(R * c * 10) / 10;
      return { ...loc, distance };
    }).sort((a, b) => a.distance - b.distance);
  },

  async addLocation(locationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/parking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: locationData.name,
          address: locationData.address,
          latitude: Number(locationData.latitude) || 18.5626,
          longitude: Number(locationData.longitude) || 73.9167,
          totalSlots: Number(locationData.totalSlots) || 50,
          availableSlots: Number(locationData.totalSlots) || 50,
          pricePerHour: Number(locationData.pricePerHour) || 40,
          status: 'OPEN'
        })
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Backend POST /api/parking failed, saving to local cache:', error.message);
    }

    const newLoc = {
      id: `loc-${Date.now()}`,
      totalSlots: locationData.totalSlots || 40,
      availableSlots: locationData.totalSlots || 40,
      rating: 5.0,
      reviewsCount: 1,
      isOpen: true,
      sensorStatus: 'ONLINE',
      lastPing: 'Updated just now',
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
      amenities: ['24/7 Security', 'Covered Parking'],
      ...locationData
    };
    locationsCache = [newLoc, ...locationsCache];
    saveCache();
    return newLoc;
  },

  async updateLocation(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/parking/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn(`Backend PUT /api/parking/${id} failed, updating local cache:`, error.message);
    }

    locationsCache = locationsCache.map(loc => String(loc.id) === String(id) ? { ...loc, ...updates } : loc);
    saveCache();
    return locationsCache.find(l => String(l.id) === String(id));
  },

  async deleteLocation(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/parking/${id}`, { method: 'DELETE' });
      if (response.ok) return true;
    } catch (error) {
      console.warn(`Backend DELETE /api/parking/${id} failed, removing from local cache:`, error.message);
    }

    locationsCache = locationsCache.filter(l => String(l.id) !== String(id));
    saveCache();
    return true;
  }
};
