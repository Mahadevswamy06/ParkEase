package com.parkease.api.repository;

import com.parkease.api.entity.ParkingLot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkingRepository extends JpaRepository<ParkingLot, Long> {
    List<ParkingLot> findByStatus(String status);
}
