package com.parkease.api.repository;

import com.parkease.api.entity.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SlotRepository extends JpaRepository<ParkingSlot, Long> {
    List<ParkingSlot> findByParkingLotId(Long parkingLotId);
    List<ParkingSlot> findByParkingLotIdAndStatus(Long parkingLotId, String status);
}
