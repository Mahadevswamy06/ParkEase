package com.parkease.api.service;

import com.parkease.api.entity.ParkingSlot;
import com.parkease.api.repository.SlotRepository;
import com.parkease.api.websocket.SlotStatusWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@SuppressWarnings("null")
public class SlotService {

    @Autowired
    private SlotRepository slotRepository;

    public List<ParkingSlot> getSlotsByParkingLot(Long parkingLotId) {
        return slotRepository.findByParkingLotId(parkingLotId);
    }

    public ParkingSlot getSlotById(Long slotId) {
        return slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found with ID: " + slotId));
    }

    @Transactional
    public ParkingSlot updateSlotStatus(Long slotId, String status) {
        ParkingSlot slot = getSlotById(slotId);
        String oldStatus = slot.getStatus();
        String newStatus = status.toUpperCase();
        slot.setStatus(newStatus);
        ParkingSlot saved = slotRepository.save(slot);

        // Broadcast slot change to all connected WebSocket clients
        String payload = String.format("{\"type\":\"SLOT_UPDATE\",\"slotId\":%d,\"parkingLotId\":%d,\"slotNumber\":\"%s\",\"previousStatus\":\"%s\",\"newStatus\":\"%s\"}",
                saved.getId(), saved.getParkingLot().getId(), saved.getSlotNumber(), oldStatus, newStatus);
        SlotStatusWebSocketHandler.broadcast(payload);

        return saved;
    }
}
