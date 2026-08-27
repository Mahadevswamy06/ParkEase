package com.parkease.api.service;

import com.parkease.api.entity.ParkingSlot;
import com.parkease.api.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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

    public ParkingSlot updateSlotStatus(Long slotId, String status) {
        ParkingSlot slot = getSlotById(slotId);
        slot.setStatus(status.toUpperCase());
        return slotRepository.save(slot);
    }
}
