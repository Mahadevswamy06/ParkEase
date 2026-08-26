// Parking Service Abstraction
import { INITIAL_LOCATIONS } from '../data/demoData';

// In-memory or localStorage cache fallback
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
    // Simulated network delay for realistic API architecture feel
    return new Promise((resolve) => {
      setTimeout(() => resolve([...locationsCache]), 150);
    });
  },

  async getLocationById(id) {
    const found = locationsCache.find(l => l.id === id);
    if (!found) throw new Error(`Parking location ${id} not found`);
    return { ...found };
  },

  async getAvailability(locationId) {
    const loc = locationsCache.find(l => l.id === locationId);
    if (!loc) return { availableSlots: 0, status: 'UNAVAILABLE' };
    return {
      availableSlots: loc.availableSlots,
      totalSlots: loc.totalSlots,
      lastUpdated: new Date().toISOString(),
      status: loc.sensorStatus
    };
  },

  async updateSlotStatus(locationId, slotId, newStatus) {
    locationsCache = locationsCache.map(loc => {
      if (loc.id === locationId) {
        const updatedSlots = loc.slots.map(s => s.id === slotId ? { ...s, status: newStatus } : s);
        const availCount = updatedSlots.filter(s => s.status === 'available').length;
        return { ...loc, slots: updatedSlots, availableSlots: availCount, lastPing: 'Updated just now' };
      }
      return loc;
    });
    saveCache();
    return locationsCache.find(l => l.id === locationId);
  },

  async addLocation(locationData) {
    const newLoc = {
      id: `loc-${Date.now()}`,
      totalSlots: locationData.totalSlots || 40,
      availableSlots: locationData.totalSlots || 40,
      rating: 5.0,
      reviewsCount: 1,
      isOpen: true,
      sensorStatus: 'ONLINE',
      lastPing: 'Updated just now',
      operatingHours: locationData.operatingHours || '24/7 Open',
      image: locationData.image || 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
      amenities: locationData.amenities || ['24/7 Security', 'Covered Parking'],
      rules: locationData.rules || ['Follow parking bay indicators'],
      slots: Array.from({ length: locationData.totalSlots || 40 }, (_, i) => ({
        id: `S${i + 1}`,
        status: 'available',
        type: i < 6 ? 'ev' : 'standard',
        price: locationData.pricePerHour || 40
      })),
      ...locationData
    };
    locationsCache = [newLoc, ...locationsCache];
    saveCache();
    return newLoc;
  },

  async updateLocation(id, updates) {
    locationsCache = locationsCache.map(loc => loc.id === id ? { ...loc, ...updates } : loc);
    saveCache();
    return locationsCache.find(l => l.id === id);
  },

  async deleteLocation(id) {
    locationsCache = locationsCache.filter(l => l.id !== id);
    saveCache();
    return true;
  }
};
