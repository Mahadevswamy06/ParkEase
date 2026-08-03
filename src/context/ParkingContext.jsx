import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_LOCATIONS, INITIAL_BOOKINGS, INITIAL_USERS } from '../utils/dummyData';

const ParkingContext = createContext(null);

export const ParkingProvider = ({ children }) => {
  // Locations
  const [locations, setLocations] = useState(() => {
    const saved = localStorage.getItem('parkease_locations');
    return saved ? JSON.parse(saved) : INITIAL_LOCATIONS;
  });

  // Bookings
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('parkease_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Users (Admin management)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('parkease_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Filters State for search page
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [maxPrice, setMaxPrice] = useState(250);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState('All');

  useEffect(() => {
    localStorage.setItem('parkease_locations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem('parkease_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('parkease_users', JSON.stringify(users));
  }, [users]);

  // Create new Booking
  const createBooking = (bookingData) => {
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingCode: `PK-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      ...bookingData
    };

    setBookings(prev => [newBooking, ...prev]);

    // Update location available slots count and slot status
    setLocations(prev => prev.map(loc => {
      if (loc.id === bookingData.locationId) {
        const updatedSlots = loc.slots.map(s => {
          if (s.id === bookingData.slotId) {
            return { ...s, status: 'reserved' };
          }
          return s;
        });
        return {
          ...loc,
          availableSlots: Math.max(0, loc.availableSlots - 1),
          slots: updatedSlots
        };
      }
      return loc;
    }));

    return newBooking;
  };

  // Cancel Booking
  const cancelBooking = (bookingId) => {
    const targetBooking = bookings.find(b => b.id === bookingId);
    if (!targetBooking) return false;

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'cancelled' };
      }
      return b;
    }));

    // Release slot back to available
    setLocations(prev => prev.map(loc => {
      if (loc.id === targetBooking.locationId) {
        const updatedSlots = loc.slots.map(s => {
          if (s.id === targetBooking.slotId) {
            return { ...s, status: 'available' };
          }
          return s;
        });
        return {
          ...loc,
          availableSlots: loc.availableSlots + 1,
          slots: updatedSlots
        };
      }
      return loc;
    }));

    return true;
  };

  // Admin Location CRUD
  const addLocation = (newLoc) => {
    const formatted = {
      id: `loc-${Date.now()}`,
      totalSlots: 30,
      availableSlots: 30,
      rating: 5.0,
      reviewsCount: 1,
      isOpen: true,
      operatingHours: "24/7 Access",
      amenities: newLoc.amenities || ["24/7 Security", "Covered"],
      slots: Array.from({ length: 12 }, (_, i) => ({
        id: `S${i + 1}`,
        type: i % 4 === 0 ? "ev" : "standard",
        status: "available",
        price: newLoc.pricePerHour || 8.00
      })),
      ...newLoc
    };
    setLocations(prev => [formatted, ...prev]);
    return formatted;
  };

  const updateLocation = (locId, fields) => {
    setLocations(prev => prev.map(loc => loc.id === locId ? { ...loc, ...fields } : loc));
  };

  const deleteLocation = (locId) => {
    setLocations(prev => prev.filter(loc => loc.id !== locId));
  };

  // Toggle individual slot status
  const updateSlotStatus = (locationId, slotId, newStatus) => {
    setLocations(prev => prev.map(loc => {
      if (loc.id === locationId) {
        const updatedSlots = loc.slots.map(s => s.id === slotId ? { ...s, status: newStatus } : s);
        const availCount = updatedSlots.filter(s => s.status === 'available').length;
        return { ...loc, slots: updatedSlots, availableSlots: availCount };
      }
      return loc;
    }));
  };

  // Admin User CRUD
  const addUser = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      memberSince: "Aug 2026",
      totalBookings: 0,
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      ...userData
    };
    setUsers(prev => [newUser, ...prev]);
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return u;
    }));
  };

  // Filtered Locations getter
  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'All' || loc.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesPrice = loc.pricePerHour <= maxPrice;
    const matchesAvailability = !onlyAvailable || loc.availableSlots > 0;
    const matchesAmenity = selectedAmenity === 'All' || loc.amenities?.includes(selectedAmenity);

    return matchesSearch && matchesCity && matchesPrice && matchesAvailability && matchesAmenity;
  });

  return (
    <ParkingContext.Provider value={{
      locations,
      bookings,
      users,
      filteredLocations,
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
      createBooking,
      cancelBooking,
      addLocation,
      updateLocation,
      deleteLocation,
      updateSlotStatus,
      addUser,
      deleteUser,
      toggleUserStatus
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
