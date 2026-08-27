package com.parkease.api.service;

import com.parkease.api.dto.BookingRequest;
import com.parkease.api.dto.BookingResponse;
import com.parkease.api.entity.Booking;
import com.parkease.api.entity.ParkingLot;
import com.parkease.api.entity.ParkingSlot;
import com.parkease.api.entity.User;
import com.parkease.api.repository.BookingRepository;
import com.parkease.api.repository.ParkingRepository;
import com.parkease.api.repository.SlotRepository;
import com.parkease.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ParkingRepository parkingRepository;

    @Autowired
    private SlotRepository slotRepository;

    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));

        ParkingLot parkingLot = parkingRepository.findById(request.getParkingLotId())
                .orElseThrow(() -> new RuntimeException("Parking Lot not found with ID: " + request.getParkingLotId()));

        ParkingSlot slot = slotRepository.findById(request.getSlotId())
                .orElseThrow(() -> new RuntimeException("Slot not found with ID: " + request.getSlotId()));

        if (!slot.getParkingLot().getId().equals(parkingLot.getId())) {
            throw new RuntimeException("Slot " + slot.getSlotNumber() + " does not belong to Parking Lot: " + parkingLot.getName());
        }

        if (!"AVAILABLE".equalsIgnoreCase(slot.getStatus())) {
            throw new RuntimeException("Slot " + slot.getSlotNumber() + " is currently " + slot.getStatus() + " and cannot be booked.");
        }

        if (request.getStartTime() == null || request.getEndTime() == null || !request.getEndTime().isAfter(request.getStartTime())) {
            throw new RuntimeException("End time must be strictly after start time.");
        }

        // Reserve Slot and decrement availability
        slot.setStatus("RESERVED");
        slotRepository.save(slot);

        if (parkingLot.getAvailableSlots() > 0) {
            parkingLot.setAvailableSlots(parkingLot.getAvailableSlots() - 1);
            parkingRepository.save(parkingLot);
        }

        // Calculate amount
        long minutes = Math.max(60, Duration.between(request.getStartTime(), request.getEndTime()).toMinutes());
        double hours = Math.ceil(minutes / 60.0);
        BigDecimal amount = parkingLot.getPricePerHour().multiply(BigDecimal.valueOf(hours)).setScale(2, RoundingMode.HALF_UP);

        Booking booking = Booking.builder()
                .user(user)
                .parkingLot(parkingLot)
                .slot(slot)
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .amount(amount)
                .status("CONFIRMED")
                .build();

        Booking saved = bookingRepository.save(booking);
        return convertToResponse(saved);
    }

    public List<BookingResponse> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
        return convertToResponse(booking);
    }

    @Transactional
    public BookingResponse cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));

        if ("CANCELLED".equalsIgnoreCase(booking.getStatus())) {
            throw new RuntimeException("Booking is already cancelled.");
        }

        booking.setStatus("CANCELLED");
        Booking saved = bookingRepository.save(booking);

        // Restore Slot and increment availability
        ParkingSlot slot = booking.getSlot();
        if (slot != null) {
            slot.setStatus("AVAILABLE");
            slotRepository.save(slot);
        }

        ParkingLot lot = booking.getParkingLot();
        if (lot != null) {
            lot.setAvailableSlots(lot.getAvailableSlots() + 1);
            parkingRepository.save(lot);
        }

        return convertToResponse(saved);
    }

    private BookingResponse convertToResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .userId(booking.getUser().getId())
                .userName(booking.getUser().getName())
                .parkingLotId(booking.getParkingLot().getId())
                .parkingName(booking.getParkingLot().getName())
                .parkingAddress(booking.getParkingLot().getAddress())
                .slotId(booking.getSlot().getId())
                .slotNumber(booking.getSlot().getSlotNumber())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .amount(booking.getAmount())
                .status(booking.getStatus())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
