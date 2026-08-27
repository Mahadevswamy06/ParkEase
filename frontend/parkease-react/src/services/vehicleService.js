// Vehicle Service Abstraction
import { INITIAL_VEHICLES } from '../data/demoData';

let vehiclesCache = (() => {
  try {
    const saved = localStorage.getItem('parkease_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  } catch (e) {
    return INITIAL_VEHICLES;
  }
})();

const saveCache = () => {
  try {
    localStorage.setItem('parkease_vehicles', JSON.stringify(vehiclesCache));
  } catch (e) {
    console.error('Failed to save vehicles to localStorage', e);
  }
};

export const vehicleService = {
  async getVehicles(userId) {
    if (!userId) return [...vehiclesCache];
    return vehiclesCache.filter(v => v.userId === userId);
  },

  async addVehicle(vehicleData) {
    // If set to default, unset other defaults
    if (vehicleData.isDefault) {
      vehiclesCache = vehiclesCache.map(v => ({ ...v, isDefault: false }));
    }

    const newVehicle = {
      id: `veh-${Date.now()}`,
      isDefault: vehiclesCache.length === 0 ? true : !!vehicleData.isDefault,
      ...vehicleData
    };

    vehiclesCache = [newVehicle, ...vehiclesCache];
    saveCache();
    return newVehicle;
  },

  async updateVehicle(id, updates) {
    if (updates.isDefault) {
      vehiclesCache = vehiclesCache.map(v => ({ ...v, isDefault: false }));
    }
    vehiclesCache = vehiclesCache.map(v => v.id === id ? { ...v, ...updates } : v);
    saveCache();
    return vehiclesCache.find(v => v.id === id);
  },

  async setDefaultVehicle(id) {
    vehiclesCache = vehiclesCache.map(v => ({ ...v, isDefault: v.id === id }));
    saveCache();
    return vehiclesCache;
  },

  async deleteVehicle(id) {
    vehiclesCache = vehiclesCache.filter(v => v.id !== id);
    saveCache();
    return true;
  }
};
