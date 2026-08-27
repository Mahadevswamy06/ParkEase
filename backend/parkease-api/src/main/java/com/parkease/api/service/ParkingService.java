package com.parkease.api.service;

import com.parkease.api.dto.ParkingResponse;
import com.parkease.api.entity.ParkingLot;
import com.parkease.api.repository.ParkingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@SuppressWarnings("null")
public class ParkingService {

    @Autowired
    private ParkingRepository parkingRepository;

    private static final double EARTH_RADIUS_KM = 6371.0;

    public List<ParkingResponse> getAllParkingLots() {
        return parkingRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public ParkingLot getParkingLotById(Long id) {
        return parkingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parking Lot not found with ID: " + id));
    }

    public List<ParkingResponse> getNearbyParking(double userLat, double userLng) {
        return parkingRepository.findAll().stream()
                .map(lot -> {
                    double distance = calculateHaversineDistance(userLat, userLng, lot.getLatitude(), lot.getLongitude());
                    ParkingResponse response = convertToResponse(lot);
                    response.setDistance(BigDecimal.valueOf(distance)
                            .setScale(1, RoundingMode.HALF_UP)
                            .doubleValue());
                    return response;
                })
                .sorted(Comparator.comparing(ParkingResponse::getDistance))
                .collect(Collectors.toList());
    }

    public ParkingLot createParkingLot(ParkingLot lot) {
        if (lot.getAvailableSlots() == null) {
            lot.setAvailableSlots(lot.getTotalSlots());
        }
        return parkingRepository.save(lot);
    }

    public ParkingLot updateParkingLot(Long id, ParkingLot updated) {
        ParkingLot existing = getParkingLotById(id);
        existing.setName(updated.getName());
        existing.setAddress(updated.getAddress());
        existing.setLatitude(updated.getLatitude());
        existing.setLongitude(updated.getLongitude());
        existing.setTotalSlots(updated.getTotalSlots());
        existing.setAvailableSlots(updated.getAvailableSlots());
        existing.setPricePerHour(updated.getPricePerHour());
        if (updated.getStatus() != null) {
            existing.setStatus(updated.getStatus());
        }
        return parkingRepository.save(existing);
    }

    public void deleteParkingLot(Long id) {
        parkingRepository.deleteById(id);
    }

    private ParkingResponse convertToResponse(ParkingLot lot) {
        return ParkingResponse.builder()
                .id(lot.getId())
                .name(lot.getName())
                .address(lot.getAddress())
                .latitude(lot.getLatitude())
                .longitude(lot.getLongitude())
                .totalSlots(lot.getTotalSlots())
                .availableSlots(lot.getAvailableSlots())
                .pricePerHour(lot.getPricePerHour())
                .status(lot.getStatus())
                .distance(0.0)
                .build();
    }

    private double calculateHaversineDistance(double lat1, double lon1, double lat2, double lon2) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }
}
