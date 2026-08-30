# 🅿️ ParkEase — Full-Stack Smart Parking System

[![Live Production Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://park-ease-mahadevswamy082-2176s-projects.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Mahadevswamy06/ParkEase)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

> **🌐 Live Website**: [https://park-ease-mahadevswamy082-2176s-projects.vercel.app](https://park-ease-mahadevswamy082-2176s-projects.vercel.app)  
> **📦 GitHub Repository**: [https://github.com/Mahadevswamy06/ParkEase](https://github.com/Mahadevswamy06/ParkEase)

---

## 🚀 Overview

**ParkEase** is a full-stack Smart Parking Management System designed for modern urban centers (Pune, Mumbai, Bengaluru, Delhi, Hyderabad, Chennai).

It combines a **Java + Spring Boot REST API backend**, **MySQL database persistence**, and a **React + Vite frontend** with Google Maps API telemetry, Haversine nearby location search, slot reservation locking, and admin controls.

---

## 📁 Full-Stack Architecture Structure

```text
ParkEase/
│
├── frontend/
│   └── parkease-react/
│       ├── public/
│       └── src/
│           ├── assets/
│           ├── components/
│           │   ├── Navbar.jsx
│           │   ├── ParkingMap.jsx
│           │   ├── SlotGrid.jsx
│           │   ├── SearchBar.jsx
│           │   ├── LoadingSkeleton.jsx
│           │   └── booking/
│           ├── pages/
│           │   ├── public/ (LandingPage, FindParking, LoginPage)
│           │   ├── user/ (UserDashboard, ParkingDetails, BookingHistory, CheckInCheckout)
│           │   └── admin/ (AdminDashboard, ManageLocations, ManageSlots)
│           ├── services/
│           │   ├── parkingService.js
│           │   ├── bookingService.js
│           │   └── userService.js
│           ├── hooks/
│           │   └── useLocation.js
│           ├── utils/
│           │   └── distance.js
│           ├── App.jsx
│           ├── main.jsx
│           └── index.css
│
└── backend/
    └── parkease-api/
        ├── src/
        │   ├── main/
        │   │   ├── java/com/parkease/api/
        │   │   │   ├── ParkEaseApplication.java
        │   │   │   ├── controller/ (ParkingController, SlotController, BookingController, UserController)
        │   │   │   ├── service/ (ParkingService, SlotService, BookingService, UserService)
        │   │   │   ├── repository/ (ParkingRepository, SlotRepository, BookingRepository, UserRepository)
        │   │   │   ├── entity/ (ParkingLot, ParkingSlot, Booking, User)
        │   │   │   ├── dto/ (ParkingResponse, BookingRequest, BookingResponse)
        │   │   │   └── config/ (CorsConfig)
        │   │   └── resources/
        │   │       ├── application.properties
        │   │       └── data.sql
        └── pom.xml
```

---

## 🗄️ Database Schema (MySQL)

```sql
CREATE DATABASE parkease;
USE parkease;

-- Users Table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parking Lots Table
CREATE TABLE parking_lots (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    address VARCHAR(255),
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    total_slots INT NOT NULL,
    available_slots INT NOT NULL,
    price_per_hour DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'OPEN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parking Slots Table
CREATE TABLE parking_slots (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    parking_lot_id BIGINT NOT NULL,
    slot_number VARCHAR(20) NOT NULL,
    slot_type VARCHAR(30) DEFAULT 'NORMAL',
    status VARCHAR(20) DEFAULT 'AVAILABLE',
    FOREIGN KEY (parking_lot_id) REFERENCES parking_lots(id)
);

-- Bookings Table
CREATE TABLE bookings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    parking_lot_id BIGINT NOT NULL,
    slot_id BIGINT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    status VARCHAR(20) DEFAULT 'CONFIRMED',
    amount DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (parking_lot_id) REFERENCES parking_lots(id),
    FOREIGN KEY (slot_id) REFERENCES parking_slots(id)
);
```

---

## 🔌 REST API Endpoints

### Parking APIs
- `GET /api/parking` — List all parking lots
- `GET /api/parking/{id}` — Get parking lot details
- `GET /api/parking/nearby?lat={lat}&lng={lng}` — Find nearby parking within distance using Haversine calculation
- `POST /api/parking` — Add new parking lot (Admin)
- `PUT /api/parking/{id}` — Update parking lot details
- `DELETE /api/parking/{id}` — Remove parking lot

### Slot APIs
- `GET /api/parking/{parkingId}/slots` — Get slots for location
- `GET /api/slots/{id}` — Get single slot details
- `PUT /api/slots/{id}/status` — Change slot status (`AVAILABLE`, `OCCUPIED`, `RESERVED`, `MAINTENANCE`)

### Booking APIs
- `POST /api/bookings` — Create slot reservation (atomic status change to `RESERVED`)
- `GET /api/bookings/user/{userId}` — Get user bookings
- `GET /api/bookings/{id}` — Get single booking details
- `PUT /api/bookings/{id}/cancel` — Cancel booking and restore slot availability

---

## 💻 Local Setup & Development

### 1. Launch Spring Boot Backend (`backend/parkease-api`)
```bash
cd backend/parkease-api
./mvnw spring-boot:run
```
Backend runs at `http://localhost:8080`.

### 2. Launch React Frontend (`frontend/parkease-react`)
```bash
cd frontend/parkease-react
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

---

Developed with ❤️ by **Mahadevswamy**
