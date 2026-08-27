// Mock & Initial Data for Smart Parking System (ParkEase India)

const todayStr = new Date().toISOString().split('T')[0];
const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

export const PARKING_LOCATIONS = [
  {
    id: 'loc-1',
    name: 'Connaught Place Central Deck',
    address: 'Block C, Inner Circle, Connaught Place',
    city: 'New Delhi',
    lat: 28.6315,
    lng: 77.2167,
    distance: '0.8 km away',
    pricePerHour: 80,
    totalSlots: 40,
    availableSlots: 14,
    rating: 4.9,
    isOpen: true,
    sensorStatus: 'ONLINE',
    lastPing: 'Live (1s ago)',
    operatingHours: '24/7 Open',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    description: 'Multi-level automated smart parking garage with high-speed ANPR camera barriers, CCTV surveillance, and 12 fast EV charging bays in the heart of New Delhi.',
    amenities: ['24/7 Security', 'ANPR Auto Barrier', 'Fast EV Charger', 'Valet Parking', 'CCTV Surveillance'],
    slots: Array.from({ length: 40 }, (_, i) => ({
      id: `A${i + 1}`,
      status: i % 3 === 0 ? 'occupied' : i % 7 === 0 ? 'reserved' : 'available',
      type: i < 8 ? 'ev' : i < 15 ? 'vip' : 'standard',
      price: i < 8 ? 120 : i < 15 ? 150 : 80
    }))
  },
  {
    id: 'loc-2',
    name: 'BKC Financial District Complex',
    address: 'G Block, Bandra Kurla Complex, Bandra East',
    city: 'Mumbai',
    lat: 19.0657,
    lng: 72.8687,
    distance: '1.4 km away',
    pricePerHour: 120,
    totalSlots: 60,
    availableSlots: 22,
    rating: 4.8,
    isOpen: true,
    sensorStatus: 'ONLINE',
    lastPing: 'Live (2s ago)',
    operatingHours: '24/7 Open',
    image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80',
    description: 'Premium underground parking facility in BKC. Features covered climate-controlled parking, VIP reservations, EV charging, and automated ticketless exit.',
    amenities: ['Covered Parking', 'VIP Reserved Bays', 'EV Supercharger', 'Wheelchair Access', 'Car Wash Bay'],
    slots: Array.from({ length: 60 }, (_, i) => ({
      id: `B${i + 1}`,
      status: i % 2 === 0 ? 'occupied' : 'available',
      type: i < 10 ? 'ev' : i < 20 ? 'vip' : 'standard',
      price: i < 10 ? 160 : i < 20 ? 200 : 120
    }))
  },
  {
    id: 'loc-3',
    name: 'MG Road Smart Multi-level Plaza',
    address: 'Near Trinity Metro Station, MG Road',
    city: 'Bengaluru',
    lat: 12.9756,
    lng: 77.6066,
    distance: '2.1 km away',
    pricePerHour: 60,
    totalSlots: 50,
    availableSlots: 8,
    rating: 4.7,
    isOpen: true,
    sensorStatus: 'ONLINE',
    lastPing: 'Live (1s ago)',
    operatingHours: '06:00 AM - 11:30 PM',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    description: 'High-tech multi-level garage near Bengaluru commercial hub with mobile app slot navigation and live guidance LED display boards.',
    amenities: ['LED Slot Indicators', 'Metro Access', 'CCTV 24/7', 'Online Pre-booking'],
    slots: Array.from({ length: 50 }, (_, i) => ({
      id: `C${i + 1}`,
      status: i % 4 === 0 ? 'available' : 'occupied',
      type: i < 6 ? 'ev' : 'standard',
      price: i < 6 ? 90 : 60
    }))
  },
  {
    id: 'loc-4',
    name: 'Jubilee Hills Tech Park Parking',
    address: 'Road No. 36, Jubilee Hills',
    city: 'Hyderabad',
    lat: 17.4319,
    lng: 78.4071,
    distance: '3.0 km away',
    pricePerHour: 70,
    totalSlots: 35,
    availableSlots: 18,
    rating: 4.9,
    isOpen: true,
    sensorStatus: 'ONLINE',
    lastPing: 'Live (3s ago)',
    operatingHours: '24/7 Open',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    description: 'Spacious open and covered parking lot surrounded by tech offices and high-end dining hubs in Jubilee Hills.',
    amenities: ['Covered Slots', 'ANPR Camera', 'Valet Service', 'EV Station'],
    slots: Array.from({ length: 35 }, (_, i) => ({
      id: `D${i + 1}`,
      status: i % 3 === 1 ? 'occupied' : 'available',
      type: i < 5 ? 'ev' : 'standard',
      price: i < 5 ? 100 : 70
    }))
  },
  {
    id: 'loc-5',
    name: 'Park Street Plaza Garage',
    address: 'Chowringhee Road, Park Street',
    city: 'Kolkata',
    lat: 22.5539,
    lng: 88.3524,
    distance: '1.1 km away',
    pricePerHour: 50,
    totalSlots: 30,
    availableSlots: 5,
    rating: 4.6,
    isOpen: true,
    sensorStatus: 'ONLINE',
    lastPing: 'Live (1s ago)',
    operatingHours: '07:00 AM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80',
    description: 'Central Kolkata garage located next to heritage shopping districts and restaurants.',
    amenities: ['Security Guard', 'Subway Link', 'Digital Payment'],
    slots: Array.from({ length: 30 }, (_, i) => ({
      id: `E${i + 1}`,
      status: i % 5 === 0 ? 'available' : 'occupied',
      type: 'standard',
      price: 50
    }))
  },
  {
    id: 'loc-6',
    name: 'T. Nagar Commercial Deck',
    address: 'Pondy Bazaar, T. Nagar',
    city: 'Chennai',
    lat: 13.0418,
    lng: 80.2341,
    distance: '2.5 km away',
    pricePerHour: 60,
    totalSlots: 45,
    availableSlots: 19,
    rating: 4.8,
    isOpen: true,
    sensorStatus: 'ONLINE',
    lastPing: 'Live (2s ago)',
    operatingHours: '24/7 Open',
    image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80',
    description: 'Automated multi-floor facility with dedicated EV quick charging pods and real-time bay status displays.',
    amenities: ['ANPR Barrier', 'EV Charging', '24/7 Access', 'Elevator'],
    slots: Array.from({ length: 45 }, (_, i) => ({
      id: `F${i + 1}`,
      status: i % 2 === 1 ? 'available' : 'occupied',
      type: i < 6 ? 'ev' : 'standard',
      price: i < 6 ? 90 : 60
    }))
  }
];

export const INITIAL_LOCATIONS = PARKING_LOCATIONS;

export const INITIAL_BOOKINGS = [
  {
    id: 'bk-101',
    bookingCode: 'PRK-DL-8821',
    userId: 'usr-1',
    userName: 'Mahadev',
    locationId: 'loc-1',
    locationName: 'Connaught Place Central Deck',
    address: 'Block C, Connaught Place, New Delhi',
    slotId: 'A12',
    vehicleNumber: 'DL-01-AB-1234',
    date: todayStr,
    startTime: '10:00 AM',
    durationHours: 3,
    totalAmount: 240,
    status: 'active',
    paymentMethod: 'UPI / GPay'
  },
  {
    id: 'bk-102',
    bookingCode: 'PRK-MH-4109',
    userId: 'usr-1',
    userName: 'Mahadev',
    locationId: 'loc-2',
    locationName: 'BKC Financial District Complex',
    address: 'Bandra Kurla Complex, Mumbai',
    slotId: 'B05',
    vehicleNumber: 'MH-02-CD-5678',
    date: tomorrowStr,
    startTime: '02:00 PM',
    durationHours: 4,
    totalAmount: 480,
    status: 'upcoming',
    paymentMethod: 'Credit Card (Visa)'
  },
  {
    id: 'bk-103',
    bookingCode: 'PRK-KA-9904',
    userId: 'usr-1',
    userName: 'Mahadev',
    locationId: 'loc-3',
    locationName: 'MG Road Smart Multi-level Plaza',
    address: 'MG Road, Bengaluru',
    slotId: 'C18',
    vehicleNumber: 'KA-05-EF-9012',
    date: yesterdayStr,
    startTime: '09:00 AM',
    durationHours: 2,
    totalAmount: 120,
    status: 'completed',
    paymentMethod: 'Paytm Wallet'
  },
  {
    id: 'bk-104',
    bookingCode: 'PRK-TS-3312',
    userId: 'usr-2',
    userName: 'Priya Sharma',
    locationId: 'loc-4',
    locationName: 'Jubilee Hills Tech Park Parking',
    address: 'Jubilee Hills, Hyderabad',
    slotId: 'D02',
    vehicleNumber: 'TS-09-GH-3456',
    date: todayStr,
    startTime: '11:00 AM',
    durationHours: 5,
    totalAmount: 350,
    status: 'active',
    paymentMethod: 'PhonePe'
  }
];

export const MOCK_USERS = [
  {
    id: 'usr-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@parkease.in',
    phone: '+91 98765 43210',
    role: 'user',
    vehiclePlate: 'DL-01-AB-1234',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    memberSince: 'Jan 2024',
    totalBookings: 14
  },
  {
    id: 'usr-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@parkease.in',
    phone: '+91 98123 67890',
    role: 'user',
    vehiclePlate: 'TS-09-GH-3456',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    memberSince: 'Mar 2024',
    totalBookings: 8
  },
  {
    id: 'usr-3',
    name: 'Rajesh Kumar (Admin)',
    email: 'admin.rajesh@parkease.in',
    phone: '+91 99000 11223',
    role: 'admin',
    vehiclePlate: 'KA-01-XY-9999',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    status: 'Active',
    memberSince: 'Nov 2023',
    totalBookings: 42
  }
];

export const INITIAL_USERS = MOCK_USERS;

export const ADMIN_STATS = {
  totalRevenue: '₹4,89,200',
  revenueGrowth: '+18.4% this month',
  totalBookings: '3,420',
  bookingsGrowth: '+12.5% vs last month',
  occupancyRate: '84.5%',
  occupancyGrowth: '+4.2% peak hours',
  revenueChart: [
    { month: 'Jan', revenue: 320000 },
    { month: 'Feb', revenue: 350000 },
    { month: 'Mar', revenue: 390000 },
    { month: 'Apr', revenue: 410000 },
    { month: 'May', revenue: 440000 },
    { month: 'Jun', revenue: 465000 },
    { month: 'Jul', revenue: 489200 }
  ],
  occupancyByCity: [
    { name: 'New Delhi', percentage: 92 },
    { name: 'Mumbai', percentage: 88 },
    { name: 'Bengaluru', percentage: 84 },
    { name: 'Hyderabad', percentage: 79 },
    { name: 'Kolkata', percentage: 72 },
    { name: 'Chennai', percentage: 81 }
  ],
  slotTypeDistribution: [
    { name: 'Standard Slots', value: 65 },
    { name: 'EV Charging Slots', value: 20 },
    { name: 'VIP Covered Bays', value: 15 }
  ]
};

export const FAQ_ITEMS = [
  {
    question: 'How does ANPR automatic gate entry work in India?',
    answer: 'Our high-speed optical ANPR cameras scan your vehicle license plate (e.g. DL-01-AB-1234) upon arrival. If you have an active pre-booking, the barrier gate automatically opens in under 1 second without needing paper tickets.'
  },
  {
    question: 'Can I extend my active parking session if I am running late?',
    answer: 'Yes! You can extend your active session anytime directly from your ParkEase user dashboard with 1-click using UPI, Paytm, or Credit/Debit card.'
  },
  {
    question: 'Are EV charging bays included with the parking reservation?',
    answer: 'Yes, slots marked with an EV lightning icon feature dedicated fast AC/DC charging points. Surcharges apply per kWh based on garage rate.'
  },
  {
    question: 'What happens if camera recognition fails at the entrance?',
    answer: 'In the rare case of heavy mud or license plate obstruction, simply tap "Gate Pass QR" on your dashboard and scan the digital QR code at the optical kiosk reader.'
  }
];

export const FAQ_DATA = FAQ_ITEMS;
