package com.parkease.api.controller;

import com.parkease.api.dto.SlotStatusUpdateRequest;
import com.parkease.api.entity.ParkingSlot;
import com.parkease.api.service.SlotService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SlotController {

    @Autowired
    private SlotService slotService;

    @GetMapping("/parking/{parkingId}/slots")
    public ResponseEntity<List<ParkingSlot>> getSlotsByParkingLot(@PathVariable Long parkingId) {
        return ResponseEntity.ok(slotService.getSlotsByParkingLot(parkingId));
    }

    @GetMapping("/slots/{id}")
    public ResponseEntity<ParkingSlot> getSlotById(@PathVariable Long id) {
        return ResponseEntity.ok(slotService.getSlotById(id));
    }

    @PutMapping("/slots/{id}/status")
    public ResponseEntity<ParkingSlot> updateSlotStatus(
            @PathVariable Long id,
            @Valid @RequestBody SlotStatusUpdateRequest request) {
        return ResponseEntity.ok(slotService.updateSlotStatus(id, request.getStatus()));
    }
}
