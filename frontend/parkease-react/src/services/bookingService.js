// ParkEase REST API Booking Service
import { INITIAL_BOOKINGS } from '../data/demoData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

let bookingsCache = (() => {
  try {
    const saved = localStorage.getItem('parkease_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  } catch (e) {
    return INITIAL_BOOKINGS;
  }
})();

const saveCache = () => {
  try {
    localStorage.setItem('parkease_bookings', JSON.stringify(bookingsCache));
  } catch (e) {
    console.error('Failed to save bookings to localStorage', e);
  }
};

export const bookingService = {
  async getBookings(userId) {
    if (userId) {
      try {
        const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`);
        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.warn(`Backend GET /api/bookings/user/${userId} failed, using local cache:`, error.message);
      }
      return bookingsCache.filter(b => String(b.userId) === String(userId));
    }

    return [...bookingsCache];
  },

  async getBookingById(bookingId) {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn(`Backend GET /api/bookings/${bookingId} failed, checking local cache:`, error.message);
    }
    const found = bookingsCache.find(b => String(b.id) === String(bookingId) || b.bookingCode === bookingId);
    if (!found) throw new Error(`Booking ${bookingId} not found`);
    return { ...found };
  },

  async createBooking(bookingData) {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: bookingData.userId || 1,
          parkingLotId: bookingData.parkingLotId || 1,
          slotId: bookingData.slotId || 1,
          startTime: bookingData.startTime || new Date().toISOString(),
          endTime: bookingData.endTime || new Date(Date.now() + 7200000).toISOString()
        })
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Backend POST /api/bookings failed, creating in local cache:', error.message);
    }

    const newBooking = {
      id: `bk-${Date.now()}`,
      bookingCode: `PRK-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'active',
      paymentStatus: 'paid',
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    bookingsCache = [newBooking, ...bookingsCache];
    saveCache();
    return newBooking;
  },

  async cancelBooking(bookingId) {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, { method: 'PUT' });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn(`Backend PUT /api/bookings/${bookingId}/cancel failed, updating local cache:`, error.message);
    }

    bookingsCache = bookingsCache.map(b => String(b.id) === String(bookingId) ? { ...b, status: 'cancelled' } : b);
    saveCache();
    return bookingsCache.find(b => String(b.id) === String(bookingId));
  }
};
