// Realistic Indian Smart Parking Demo Data for ParkEase SaaS

const todayStr = new Date().toISOString().split('T')[0];
const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

export const INITIAL_LOCATIONS = [
  {
    id: 'loc-1',
    name: 'Phoenix Marketcity Parking',
    address: 'Whitefield Main Road, Mahadevapura',
    city: 'Bengaluru',
    lat: 12.9959,
    lng: 77.6964,
    distance: '1.2 km away',
    pricePerHour: 40,
    totalSlots: 128,
    availableSlots: 34,
    rating: 4.8,
    reviewsCount: 342,
    isOpen: true,
    sensorStatus: 'ONLINE',
    lastPing: 'Updated 4s ago',
    openingTime: '08:00 AM',
    closingTime: '11:00 PM',
    operatingHours: '08:00 AM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    description: 'Premier multi-level automated smart parking garage at Phoenix Marketcity with ANPR license plate recognition, 16 fast EV charging bays, covered climate control, and 24/7 security surveillance.',
    amenities: ['ANPR Auto Barrier', 'Fast EV Charger', 'Covered Parking', '24/7 Security', 'Valet Parking', 'Wheelchair Accessible'],
    rules: ['Maximum height limit: 2.2m', 'No idling engines inside', 'EV slots reserved for active charging only'],
    slots: Array.from({ length: 40 }, (_, i) => ({
      id: `A${i + 1}`,
      status: i % 3 === 0 ? 'occupied' : i % 7 === 0 ? 'reserved' : i === 12 ? 'maintenance' : 'available',
      type: i < 10 ? 'ev' : i < 18 ? 'vip' : 'standard',
      price: i < 10 ? 60 : i < 18 ? 80 : 40
    }))
  },
  {
    id: 'loc-2',
    name: 'BKC Financial District Complex',
    address: 'G Block, Bandra Kurla Complex, Bandra East',
    city: 'Mumbai',
    lat: 19.0657,
    lng: 72.8687,
    distance: '2.4 km away',
    pricePerHour: 100,
    totalSlots: 150,
    availableSlots: 42,
    rating: 4.9,
    reviewsCount: 512,
    isOpen: true,
    sensorStatus: 'ONLINE',
    lastPing: 'Updated 2s ago',
    openingTime: '24 Hours',
    closingTime: '24 Hours',
    operatingHours: '24/7 Open',
    image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80',
    description: 'High-security underground corporate parking in BKC Mumbai. Features VIP elevator access, contactless ticketless checkout, car wash bay, and fast EV superchargers.',
    amenities: ['Covered Parking', 'VIP Reserved Bays', 'EV Supercharger', 'Car Wash Bay', 'CCTV 24/7'],
    rules: ['Valid photo ID required for overnight stay', 'Reserved slots held up to 15 minutes after start time'],
    slots: Array.from({ length: 50 }, (_, i) => ({
      id: `B${i + 1}`,
      status: i % 2 === 0 ? 'occupied' : 'available',
      type: i < 12 ? 'ev' : i < 22 ? 'vip' : 'standard',
      price: i < 12 ? 140 : i < 22 ? 180 : 100
    }))
  },
  {
    id: 'loc-3',
    name: 'Connaught Place Central Deck',
    address: 'Block C, Inner Circle, Connaught Place',
    city: 'Delhi',
    lat: 28.6315,
    lng: 77.2167,
    distance: '0.8 km away',
    pricePerHour: 60,
    totalSlots: 90,
    availableSlots: 18,
    rating: 4.7,
    reviewsCount: 280,
    isOpen: true,
    sensorStatus: 'ONLINE',
    lastPing: 'Updated 6s ago',
    openingTime: '06:00 AM',
    closingTime: '12:00 AM',
    operatingHours: '06:00 AM - 12:00 AM',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    description: 'Automated multi-deck facility located right in Connaught Place inner circle, providing easy subway connectivity and mobile LED slot navigation.',
    amenities: ['ANPR Auto Barrier', 'Metro Access', 'Covered Parking', '24/7 Security'],
    rules: ['No commercial trucks', 'Keep parking pass QR code handy'],
    slots: Array.from({ length: 36 }, (_, i) => ({
      id: `C${i + 1}`,
      status: i % 4 === 0 ? 'available' : 'occupied',
      type: i < 6 ? 'ev' : 'standard',
      price: i < 6 ? 90 : 60
    }))
  },
  {
    id: 'loc-4',
    name: 'Pune Central Mall Plaza',
    address: 'University Road, Shivaji Nagar',
    city: 'Pune',
    lat: 18.5308,
    lng: 73.8474,
    distance: '1.9 km away',
    pricePerHour: 35,
    totalSlots: 80,
    availableSlots: 26,
    rating: 4.6,
    reviewsCount: 195,
    isOpen: true,
    sensorStatus: 'ONLINE',
    lastPing: 'Updated 5s ago',
    openingTime: '09:00 AM',
    closingTime: '11:00 PM',
    operatingHours: '09:00 AM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    description: 'Modern shopping district parking with dedicated two-wheeler bays, EV charging stations, and automated ticketless pay stations.',
    amenities: ['Covered Parking', 'EV Charging', 'Bike Parking', 'Digital Payment'],
    rules: ['Helmets must be stored safely', 'Receipt required for exit'],
    slots: Array.from({ length: 32 }, (_, i) => ({
      id: `D${i + 1}`,
      status: i % 3 === 1 ? 'occupied' : 'available',
      type: i < 5 ? 'ev' : 'standard',
      price: i < 5 ? 55 : 35
    }))
  },
  {
    id: 'loc-5',
    name: 'Hitech City Tech Park Deck',
    address: 'Cyber Towers Road, Hitech City',
    city: 'Hyderabad',
    lat: 17.4435,
    lng: 78.3772,
    distance: '3.1 km away',
    pricePerHour: 50,
    totalSlots: 110,
    availableSlots: 45,
    rating: 4.9,
    reviewsCount: 420,
    isOpen: true,
    sensorStatus: 'ONLINE',
    lastPing: 'Updated 3s ago',
    openingTime: '24 Hours',
    closingTime: '24 Hours',
    operatingHours: '24/7 Open',
    image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80',
    description: 'Tech park smart parking garage equipped with IoT bay occupancy sensors, automated ANPR barriers, fast charging, and mobile slot reservations.',
    amenities: ['IoT Bay Sensors', 'Fast EV Charger', 'Valet Service', 'CCTV 24/7', 'Covered'],
    rules: ['Company badge required for discounted corporate tariff'],
    slots: Array.from({ length: 44 }, (_, i) => ({
      id: `E${i + 1}`,
      status: i % 2 === 1 ? 'available' : 'occupied',
      type: i < 8 ? 'ev' : 'standard',
      price: i < 8 ? 80 : 50
    }))
  },
  {
    id: 'loc-6',
    name: 'T. Nagar Commercial Plaza',
    address: 'Pondy Bazaar, T. Nagar',
    city: 'Chennai',
    lat: 13.0418,
    lng: 80.2341,
    distance: '2.7 km away',
    pricePerHour: 45,
    totalSlots: 75,
    availableSlots: 14,
    rating: 4.7,
    reviewsCount: 230,
    isOpen: true,
    sensorStatus: 'ONLINE',
    lastPing: 'Updated 7s ago',
    openingTime: '07:00 AM',
    closingTime: '11:00 PM',
    operatingHours: '07:00 AM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    description: 'Multi-floor parking facility located right at Pondy Bazaar shopping district in Chennai with live LED availability guidance.',
    amenities: ['ANPR Auto Barrier', 'EV Charging', '24/7 Security', 'Elevator'],
    rules: ['Store ticket carefully or use digital pass'],
    slots: Array.from({ length: 30 }, (_, i) => ({
      id: `F${i + 1}`,
      status: i % 3 === 0 ? 'available' : 'occupied',
      type: i < 4 ? 'ev' : 'standard',
      price: i < 4 ? 70 : 45
    }))
  }
];

export const INITIAL_VEHICLES = [
  {
    id: 'veh-1',
    userId: 'usr-1',
    type: 'Car',
    brand: 'Tata',
    model: 'Nexon EV',
    registrationNumber: 'KA-01-AB-1234',
    color: 'Midnight Black',
    isDefault: true
  },
  {
    id: 'veh-2',
    userId: 'usr-1',
    type: 'Car',
    brand: 'Hyundai',
    model: 'Creta',
    registrationNumber: 'MH-12-PQ-5678',
    color: 'Polar White',
    isDefault: false
  },
  {
    id: 'veh-3',
    userId: 'usr-1',
    type: 'EV',
    brand: 'Ather',
    model: '450X',
    registrationNumber: 'KA-05-EV-9988',
    color: 'Space Grey',
    isDefault: false
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'bk-101',
    bookingCode: 'PRK-KA-8821',
    userId: 'usr-1',
    userName: 'Mahadev Swamy',
    parkingId: 'loc-1',
    parkingName: 'Phoenix Marketcity Parking',
    address: 'Whitefield Main Road, Bengaluru',
    slotId: 'A12',
    vehicleId: 'veh-1',
    vehicleNumber: 'KA-01-AB-1234',
    vehicleDetails: 'Tata Nexon EV (Black)',
    date: todayStr,
    startTime: '10:00 AM',
    endTime: '01:00 PM',
    durationHours: 3,
    parkingFee: 120,
    taxes: 21.6,
    convenienceFee: 15,
    amount: 156.6,
    status: 'active', // 'reserved', 'arriving', 'active', 'completed', 'cancelled'
    paymentStatus: 'paid',
    paymentMethod: 'UPI (Google Pay)',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'bk-102',
    bookingCode: 'PRK-MH-4109',
    userId: 'usr-1',
    userName: 'Mahadev Swamy',
    parkingId: 'loc-2',
    parkingName: 'BKC Financial District Complex',
    address: 'Bandra Kurla Complex, Mumbai',
    slotId: 'B05',
    vehicleId: 'veh-2',
    vehicleNumber: 'MH-12-PQ-5678',
    vehicleDetails: 'Hyundai Creta (White)',
    date: tomorrowStr,
    startTime: '02:00 PM',
    endTime: '06:00 PM',
    durationHours: 4,
    parkingFee: 400,
    taxes: 72,
    convenienceFee: 20,
    amount: 492,
    status: 'upcoming',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card (Visa)',
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'bk-103',
    bookingCode: 'PRK-DL-9904',
    userId: 'usr-1',
    userName: 'Mahadev Swamy',
    parkingId: 'loc-3',
    parkingName: 'Connaught Place Central Deck',
    address: 'Connaught Place, Delhi',
    slotId: 'C18',
    vehicleId: 'veh-1',
    vehicleNumber: 'KA-01-AB-1234',
    vehicleDetails: 'Tata Nexon EV (Black)',
    date: yesterdayStr,
    startTime: '09:00 AM',
    endTime: '11:00 AM',
    durationHours: 2,
    parkingFee: 120,
    taxes: 21.6,
    convenienceFee: 10,
    amount: 151.6,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'Paytm Wallet',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    userId: 'usr-1',
    title: 'Parking Reservation Active',
    message: 'Your slot A12 at Phoenix Marketcity Parking is active. Show pass at entrance.',
    type: 'booking',
    read: false,
    timestamp: '10 mins ago'
  },
  {
    id: 'notif-2',
    userId: 'usr-1',
    title: 'Payment Confirmed',
    message: 'Payment of ₹156.60 via UPI was successfully processed for booking #PRK-KA-8821.',
    type: 'payment',
    read: false,
    timestamp: '1 hour ago'
  },
  {
    id: 'notif-3',
    userId: 'usr-1',
    title: 'Upcoming Reservation Reminder',
    message: 'You have a booking at BKC Financial District tomorrow at 02:00 PM.',
    type: 'reminder',
    read: true,
    timestamp: 'Yesterday'
  }
];

export const MOCK_USERS = [
  {
    id: 'usr-1',
    name: 'Mahadev Swamy',
    email: 'mahadev@parkease.in',
    phone: '+91 98765 43210',
    role: 'driver',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    memberSince: 'Aug 2026',
    totalBookings: 12
  },
  {
    id: 'usr-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@parkease.in',
    phone: '+91 98123 67890',
    role: 'driver',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    memberSince: 'Jul 2026',
    totalBookings: 8
  },
  {
    id: 'usr-3',
    name: 'Rajesh Kumar (Admin)',
    email: 'admin.rajesh@parkease.in',
    phone: '+91 99000 11223',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    memberSince: 'Jan 2026',
    totalBookings: 42
  }
];

export const ADMIN_STATS = {
  todayRevenue: '₹48,920',
  revenueGrowth: '+18.4% vs yesterday',
  activeSessions: 38,
  totalBookings: 342,
  occupancyRate: '82.4%',
  availableSlots: 179,
  cancelledBookings: 4,
  revenueChart: [
    { month: 'Mon', revenue: 32000 },
    { month: 'Tue', revenue: 38000 },
    { month: 'Wed', revenue: 42000 },
    { month: 'Thu', revenue: 39000 },
    { month: 'Fri', revenue: 47000 },
    { month: 'Sat', revenue: 56000 },
    { month: 'Sun', revenue: 48920 }
  ],
  occupancyByCity: [
    { name: 'Bengaluru', percentage: 88 },
    { name: 'Mumbai', percentage: 92 },
    { name: 'Delhi', percentage: 80 },
    { name: 'Pune', percentage: 68 },
    { name: 'Hyderabad', percentage: 76 },
    { name: 'Chennai', percentage: 81 }
  ],
  peakHoursData: [
    { hour: '08:00', occupancy: 40 },
    { hour: '10:00', occupancy: 85 },
    { hour: '12:00', occupancy: 92 },
    { hour: '14:00', occupancy: 88 },
    { hour: '16:00', occupancy: 78 },
    { hour: '18:00', occupancy: 95 },
    { hour: '20:00', occupancy: 70 }
  ]
};
