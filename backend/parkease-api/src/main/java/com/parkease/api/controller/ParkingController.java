package com.parkease.api.controller;

import com.parkease.api.dto.ParkingResponse;
import com.parkease.api.entity.ParkingLot;
import com.parkease.api.service.ParkingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking")
@CrossOrigin(origins = "*")
public class ParkingController {

    @Autowired
    private ParkingService parkingService;

    @GetMapping
    public ResponseEntity<List<ParkingResponse>> getAllParkingLots() {
        return ResponseEntity.ok(parkingService.getAllParkingLots());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParkingLot> getParkingLotById(@PathVariable Long id) {
        return ResponseEntity.ok(parkingService.getParkingLotById(id));
    }

    @GetMapping("/nearby")
    public ResponseEntity<List<ParkingResponse>> getNearbyParking(
            @RequestParam double lat,
            @RequestParam double lng) {
        return ResponseEntity.ok(parkingService.getNearbyParking(lat, lng));
    }

    @PostMapping
    public ResponseEntity<ParkingLot> createParkingLot(@Valid @RequestBody ParkingLot parkingLot) {
        return ResponseEntity.status(HttpStatus.CREATED).body(parkingService.createParkingLot(parkingLot));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParkingLot> updateParkingLot(@PathVariable Long id, @Valid @RequestBody ParkingLot parkingLot) {
        return ResponseEntity.ok(parkingService.updateParkingLot(id, parkingLot));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParkingLot(@PathVariable Long id) {
        parkingService.deleteParkingLot(id);
        return ResponseEntity.noContent().build();
    }
}
