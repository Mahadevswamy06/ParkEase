package com.parkease.api.repository;

import com.parkease.api.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByParkingLotId(Long parkingLotId);
    List<Booking> findBySlotIdAndStatusIn(Long slotId, List<String> statuses);
}
