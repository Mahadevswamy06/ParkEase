-- Insert Initial Users
INSERT IGNORE INTO users (id, name, email, password, role) VALUES
(1, 'Mahadev Swamy', 'driver@parkease.in', 'password123', 'USER'),
(2, 'Admin Manager', 'admin@parkease.in', 'admin123', 'ADMIN');

-- Insert Initial Parking Lots in Pune and Metros
INSERT IGNORE INTO parking_lots (id, name, address, latitude, longitude, total_slots, available_slots, price_per_hour, status) VALUES
(1, 'Phoenix Parking', 'Viman Nagar, Pune', 18.5626000, 73.9167000, 100, 37, 40.00, 'OPEN'),
(2, 'Amanora Town Centre', 'Hadapsar, Pune', 18.5186000, 73.9315000, 120, 54, 50.00, 'OPEN'),
(3, 'Westend Mall Garage', 'Aundh, Pune', 18.5604000, 73.8077000, 80, 18, 35.00, 'OPEN'),
(4, 'Seasons Mall Parking', 'Magarpatta, Pune', 18.5196000, 73.9301000, 150, 82, 45.00, 'OPEN'),
(5, 'Pavilion Mall Hub', 'SB Road, Pune', 18.5332000, 73.8322000, 90, 29, 60.00, 'OPEN'),
(6, 'Express Towers Plaza', 'Nariman Point, Mumbai', 18.9264000, 72.8223000, 60, 5, 80.00, 'OPEN'),
(7, 'MG Road Metro Deck', 'Indiranagar, Bengaluru', 12.9784000, 77.6408000, 110, 65, 55.00, 'OPEN');

-- Insert Sample Parking Slots for Phoenix Parking (Lot 1)
INSERT IGNORE INTO parking_slots (id, parking_lot_id, slot_number, slot_type, status) VALUES
(1, 1, 'A01', 'NORMAL', 'AVAILABLE'),
(2, 1, 'A02', 'NORMAL', 'OCCUPIED'),
(3, 1, 'A03', 'EV', 'AVAILABLE'),
(4, 1, 'A04', 'DISABLED', 'AVAILABLE'),
(5, 1, 'A05', 'VIP', 'RESERVED'),
(6, 1, 'A06', 'NORMAL', 'AVAILABLE'),
(7, 1, 'B01', 'NORMAL', 'AVAILABLE'),
(8, 1, 'B02', 'NORMAL', 'OCCUPIED'),
(9, 1, 'B03', 'EV', 'AVAILABLE'),
(10, 1, 'B04', 'NORMAL', 'MAINTENANCE'),
(11, 1, 'B05', 'NORMAL', 'AVAILABLE'),
(12, 1, 'B06', 'VIP', 'AVAILABLE');

-- Insert Sample Parking Slots for Amanora (Lot 2)
INSERT IGNORE INTO parking_slots (id, parking_lot_id, slot_number, slot_type, status) VALUES
(13, 2, 'A01', 'NORMAL', 'AVAILABLE'),
(14, 2, 'A02', 'EV', 'AVAILABLE'),
(15, 2, 'A03', 'NORMAL', 'RESERVED'),
(16, 2, 'A04', 'NORMAL', 'AVAILABLE');
