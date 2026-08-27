package com.parkease.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingResponse {
    private Long id;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private Integer totalSlots;
    private Integer availableSlots;
    private BigDecimal pricePerHour;
    private String status;
    private Double distance; // Distance in kilometers from user location
}
