import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { parkingService } from '../services/parkingService';
import { bookingService } from '../services/bookingService';
import { vehicleService } from '../services/vehicleService';
import { notificationService } from '../services/notificationService';
import { realtimeService } from '../services/realtimeService';

const ParkingContext = createContext(null);

// Haversine formula to compute distance between two lat/lng points in km
function getHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

export const ParkingProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [maxPrice, setMaxPrice] = useState(200);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState('All');
  const [selectedVehicleType, setSelectedVehicleType] = useState('All');
  const [sortBy, setSortBy] = useState('distance'); // 'distance', 'price_asc', 'availability', 'rating'

  // Geolocation & Telemetry State
  const [userLocation, setUserLocation] = useState(null);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState('Just now');
  const [liveEvents, setLiveEvents] = useState([
    { id: 'evt-1', time: '10:14 AM', text: 'ANPR Gate 1: Plate KA-01-AB-1234 entry verified at Phoenix Marketcity', type: 'entry' },
    { id: 'evt-2', time: '10:12 AM', text: 'IoT Slot A12 status changed to OCCUPIED', type: 'sensor' },
    { id: 'evt-3', time: '10:08 AM', text: 'EV Fast Charging session active on Slot B02 (40 kW)', type: 'ev' }
  ]);

  // Initial Load from Services
  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [locs, bks, vehs, notifs] = await Promise.all([
        parkingService.getLocations(),
        bookingService.getBookings(),
        vehicleService.getVehicles(),
        notificationService.getNotifications()
      ]);
      setLocations(locs);
      setBookings(bks);
      setVehicles(vehs);
      setNotifications(notifs);
    } catch (err) {
      console.error('Error initializing parking data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Connect to Real-time service & handle simulation updates
  useEffect(() => {
    realtimeService.connect();

    const unsubscribe = realtimeService.subscribe('heartbeat', () => {
      setLastUpdatedTime(`Updated ${Math.floor(Math.random() * 8) + 1} seconds ago`);
    });

    // Background interval to simulate live slot availability updates
    const liveInterval = setInterval(() => {
      setLocations(prev => {
        if (!prev.length) return prev;
        const randIdx = Math.floor(Math.random() * prev.length);
        const target = prev[randIdx];
        if (!target || !target.slots || !target.slots.length) return prev;

        const randSlotIdx = Math.floor(Math.random() * target.slots.length);
        const currentSlot = target.slots[randSlotIdx];
        const newStatus = currentSlot.status === 'available' ? 'occupied' : 'available';

        const updatedSlots = target.slots.map((s, idx) => idx === randSlotIdx ? { ...s, status: newStatus } : s);
        const availCount = updatedSlots.filter(s => s.status === 'available').length;

        const updatedList = prev.map((loc, idx) => idx === randIdx ? {
          ...loc,
          availableSlots: availCount,
          slots: updatedSlots,
          lastPing: 'Updated just now'
        } : loc);

        return updatedList;
      });
    }, 6000);

    return () => {
      unsubscribe();
      clearInterval(liveInterval);
    };
  }, []);

  // Fetch Live Geolocation
  const fetchUserLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsGeolocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const uLat = position.coords.latitude;
        const uLng = position.coords.longitude;
        setUserLocation({ lat: uLat, lng: uLng });

        setLocations(prev => prev.map(loc => {
          if (loc.lat && loc.lng) {
            const dist = getHaversineDistance(uLat, uLng, loc.lat, loc.lng);
            return { ...loc, distanceVal: dist, distance: `${dist} km away (GPS)` };
          }
          return loc;
        }));
        setIsGeolocating(false);
      },
      () => {
        setIsGeolocating(false);
      }
    );
  };

  // Booking Operations
  const createBooking = async (bookingData) => {
    const newBooking = await bookingService.createBooking(bookingData);
    setBookings(prev => [newBooking, ...prev]);

    // Update location availability
    await parkingService.updateSlotStatus(bookingData.parkingId, bookingData.slotId, 'reserved');
    const updatedLocs = await parkingService.getLocations();
    setLocations(updatedLocs);

    // Create confirmation notification
    const newNotif = await notificationService.addNotification({
      userId: bookingData.userId || 'usr-1',
      title: 'Booking Confirmed',
      message: `Pass #${newBooking.bookingCode} generated for slot ${newBooking.slotId} at ${newBooking.parkingName}.`,
      type: 'booking'
    });
    setNotifications(prev => [newNotif, ...prev]);

    return newBooking;
  };

  const cancelBooking = async (bookingId) => {
    const updated = await bookingService.cancelBooking(bookingId);
    if (updated) {
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
      if (updated.parkingId && updated.slotId) {
        await parkingService.updateSlotStatus(updated.parkingId, updated.slotId, 'available');
        const locs = await parkingService.getLocations();
        setLocations(locs);
      }
    }
    return updated;
  };

  // Vehicle Operations
  const addVehicle = async (vehicleData) => {
    const newVeh = await vehicleService.addVehicle(vehicleData);
    setVehicles(prev => [newVeh, ...prev.map(v => newVeh.isDefault ? { ...v, isDefault: false } : v)]);
    return newVeh;
  };

  const updateVehicle = async (id, updates) => {
    const updated = await vehicleService.updateVehicle(id, updates);
    setVehicles(prev => prev.map(v => v.id === id ? updated : (updates.isDefault ? { ...v, isDefault: false } : v)));
    return updated;
  };

  const deleteVehicle = async (id) => {
    await vehicleService.deleteVehicle(id);
    setVehicles(prev => prev.filter(v => v.id !== id));
  };

  const setDefaultVehicle = async (id) => {
    await vehicleService.setDefaultVehicle(id);
    setVehicles(prev => prev.map(v => ({ ...v, isDefault: v.id === id })));
  };

  // Notification Operations
  const markNotifRead = async (id) => {
    await notificationService.markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotifsRead = async () => {
    await notificationService.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Admin Location Operations
  const addLocation = async (data) => {
    const newLoc = await parkingService.addLocation(data);
    setLocations(prev => [newLoc, ...prev]);
    return newLoc;
  };

  const updateLocation = async (id, data) => {
    const updated = await parkingService.updateLocation(id, data);
    setLocations(prev => prev.map(l => l.id === id ? updated : l));
    return updated;
  };

  const deleteLocation = async (id) => {
    await parkingService.deleteLocation(id);
    setLocations(prev => prev.filter(l => l.id !== id));
  };

  const updateSlotStatus = async (locationId, slotId, newStatus) => {
    const updatedLoc = await parkingService.updateSlotStatus(locationId, slotId, newStatus);
    setLocations(prev => prev.map(l => l.id === locationId ? updatedLoc : l));
  };

  // Computed Filtered & Sorted Locations
  const filteredLocations = locations
    .filter(loc => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q ||
        loc.name.toLowerCase().includes(q) ||
        loc.address.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q);

      const matchesCity = selectedCity === 'All' || loc.city.toLowerCase() === selectedCity.toLowerCase();
      const matchesPrice = loc.pricePerHour <= maxPrice;
      const matchesAvailability = !onlyAvailable || loc.availableSlots > 0;
      const matchesAmenity = selectedAmenity === 'All' || loc.amenities?.includes(selectedAmenity);

      return matchesQuery && matchesCity && matchesPrice && matchesAvailability && matchesAmenity;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.pricePerHour - b.pricePerHour;
      if (sortBy === 'availability') return b.availableSlots - a.availableSlots;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: distance
      const distA = parseFloat(a.distance) || 1.0;
      const distB = parseFloat(b.distance) || 1.0;
      return distA - distB;
    });

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <ParkingContext.Provider value={{
      locations,
      filteredLocations,
      bookings,
      vehicles,
      notifications,
      unreadNotifCount,
      loading,
      searchQuery,
      setSearchQuery,
      selectedCity,
      setSelectedCity,
      maxPrice,
      setMaxPrice,
      onlyAvailable,
      setOnlyAvailable,
      selectedAmenity,
      setSelectedAmenity,
      selectedVehicleType,
      setSelectedVehicleType,
      sortBy,
      setSortBy,
      userLocation,
      isGeolocating,
      fetchUserLiveLocation,
      lastUpdatedTime,
      liveEvents,
      createBooking,
      cancelBooking,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      setDefaultVehicle,
      markNotifRead,
      markAllNotifsRead,
      addLocation,
      updateLocation,
      deleteLocation,
      updateSlotStatus,
      refreshData: loadAllData
    }}>
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => {
  const context = useContext(ParkingContext);
  if (!context) throw new Error('useParking must be used within ParkingProvider');
  return context;
};
