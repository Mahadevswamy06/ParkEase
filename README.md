# 🅿️ ParkEase — Smart Parking SaaS Platform

[![Live Production Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://park-ease-nhxaegpd5-mahadevswamy082-2176s-projects.vercel.app)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Default Theme](https://img.shields.io/badge/Default%20Theme-White%2FLight%20Mode-2563EB?style=for-the-badge)](https://github.com/Mahadevswamy06/ParkEase)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

> **🌐 Live Website**: [https://park-ease-nhxaegpd5-mahadevswamy082-2176s-projects.vercel.app](https://park-ease-nhxaegpd5-mahadevswamy082-2176s-projects.vercel.app)  
> **📦 Repository**: [https://github.com/Mahadevswamy06/ParkEase](https://github.com/Mahadevswamy06/ParkEase)

---

## 🚀 Overview

**ParkEase** is an enterprise-grade Smart Parking SaaS platform built for modern urban spaces across major Indian metros (New Delhi, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai). 

It bridges IoT hardware telemetry simulation (ANPR optical license plate scanning, barrier gate controls) with a sleek, user-centric SaaS web experience. Designed with a **Clean White/Light Mode Default Aesthetic** (Stripe & Uber inspired) and instant high-contrast Dark Mode switching, ParkEase delivers effortless spot reservation, digital QR passes, live slot telemetry, and administrative control.

---

## ✨ Key Features & UX Enhancements

- ☀️ **Default White / Light SaaS Theme**: Clean, modern high-contrast design system tailored for crisp daylight readability, with seamless one-click toggle to Dark Mode.
- ⚡ **ANPR Optical Barrier Integration**: Real-time license plate detection simulation (`DL-01-AB-1234`) for automated barrier gate entry and touchless check-in/check-out.
- 🗺️ **Interactive Visual Slot Selection**: Real-time 2D grid spot map showing Available, Occupied, EV Charging, and Reserved slots.
- 💳 **Dynamic INR (₹) Pricing Engine**: Instant transparent rate calculation customized by vehicle type (Two-Wheeler, Sedan, SUV, EV) and parking duration.
- 🎫 **Digital Pass & QR Kiosk**: Pass generation with downloadable PDF preview, one-tap Google Maps navigation, and native sharing.
- 🔑 **Dual Role-Based Workflows**: 
  - **Driver Portal**: Find parking, filter by EV/Covered, reserve slots, track active bookings, manage vehicle profiles.
  - **Admin Control Center**: Monitor revenue metrics, manage locations, override slot availability, inspect ANPR logs, generate occupancy reports.
- 🔔 **Instant Telemetry & Notifications**: Live telemetry status banner, real-time alert badges, toast notifications, and responsive mobile nav.

---

## 📁 Updated Directory Architecture

```
ParkEase/
├── public/                     # Static icons & branding assets
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                 # SVGs and static visual assets
│   ├── components/             # Reusable UI component library
│   │   ├── booking/            # BookingModal.jsx, DigitalPass.jsx
│   │   ├── common/             # InteractiveMap.jsx, Skeleton.jsx
│   │   ├── layout/             # MobileNav.jsx
│   │   ├── Button.jsx          # Styled primary/secondary buttons
│   │   ├── Card.jsx            # Universal card container with light/dark tokens
│   │   ├── EmptyState.jsx      # Friendly empty state fallback UI
│   │   ├── ErrorState.jsx      # Fallback error container
│   │   ├── FilterPanel.jsx     # Search & filter multi-select bar
│   │   ├── Footer.jsx          # Modern footer component
│   │   ├── Input.jsx           # High-contrast text & select inputs
│   │   ├── LiveTelemetryBanner.jsx # Real-time hardware status ticker
│   │   ├── LoadingSkeleton.jsx # Pulse skeleton loading states
│   │   ├── Modal.jsx           # Animated modal overlay wrapper
│   │   ├── Navbar.jsx          # Top bar navigation with theme toggle & role switcher
│   │   ├── SearchBar.jsx       # Location & venue quick search
│   │   ├── Sidebar.jsx         # Admin & User sidebar layout navigation
│   │   ├── StatisticsCard.jsx  # KPI metrics & analytics card
│   │   ├── StatusBadge.jsx     # Color-coded pill badges
│   │   └── Toast.jsx           # Floating toast notification stack
│   ├── context/                # Global React context state providers
│   │   ├── AuthContext.jsx     # Role-based auth (Driver & Admin)
│   │   ├── ParkingContext.jsx  # Slot reservations & location state
│   │   ├── ThemeContext.jsx    # Light/Dark mode state (Default: Light Mode)
│   │   └── ToastContext.jsx    # Toast notification manager
│   ├── layouts/                # Wrapper layouts (Admin, Public, User)
│   ├── pages/                  # Page routes
│   │   ├── admin/              # Admin Dashboard, ManageLocations, ManageBookings, ManageSlots, ManageUsers, ReportsPage
│   │   ├── public/             # LandingPage, FindParking, LoginPage, RegisterPage, AboutPage, ContactPage, NotFoundPage
│   │   └── user/               # UserDashboard, BookingHistory, CheckInCheckout, ProfilePage, Notifications, ParkingDetails
│   ├── services/               # Service-oriented API modules
│   │   ├── anprService.js      # License plate scanning telemetry
│   │   ├── bookingService.js   # Reservation workflows
│   │   ├── parkingService.js   # Parking location data provider
│   │   ├── pricingService.js   # Dynamic rate calculation engine
│   │   └── telemetryService.js # Live IoT sensor telemetry feed
│   ├── utils/                  # Utility helpers & mock dataset
│   │   ├── dummyData.js        # Seed locations & bookings dataset
│   │   └── formatters.js       # Currency (₹), date & plate formatters
│   ├── App.jsx                 # React Router v7 routes & layout setup
│   ├── index.css               # Global Design System tokens & CSS Custom Properties
│   └── main.jsx                # Application root entry point
├── vercel.json                 # Vercel SPA deployment configuration
├── vite.config.js              # Vite build configuration
└── package.json                # Project manifest & dependencies
```

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Engine**: [Vite 6.0](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: Vanilla CSS3 with Global Tokens & Design Variables
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Data**: [Recharts](https://recharts.org/)
- **Hosting & CI/CD**: [Vercel](https://vercel.app)

---

## 💻 Local Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mahadevswamy06/ParkEase.git
   cd ParkEase
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build production bundle**:
   ```bash
   npm run build
   ```

---

## 🔗 Updated Repository Links

- 🐙 **GitHub Repository**: [https://github.com/Mahadevswamy06/ParkEase](https://github.com/Mahadevswamy06/ParkEase)
- ⚡ **Live Vercel Application**: [https://park-ease-nhxaegpd5-mahadevswamy082-2176s-projects.vercel.app](https://park-ease-nhxaegpd5-mahadevswamy082-2176s-projects.vercel.app)

---

Developed with ❤️ by **Mahadevswamy**
