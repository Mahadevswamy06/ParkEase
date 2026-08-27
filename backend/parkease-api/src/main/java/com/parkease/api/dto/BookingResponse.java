package com.parkease.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {
    private Long id;
    private Long userId;
    private String userName;
    private Long parkingLotId;
    private String parkingName;
    private String parkingAddress;
    private Long slotId;
    private String slotNumber;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private BigDecimal amount;
    private String status;
    private LocalDateTime createdAt;
}
