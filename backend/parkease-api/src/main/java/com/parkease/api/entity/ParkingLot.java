package com.parkease.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "parking_lots")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingLot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Parking lot name is required")
    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 255)
    private String address;

    @NotNull(message = "Latitude is required")
    @Column(nullable = false, precision = 10, scale = 7)
    private Double latitude;

    @NotNull(message = "Longitude is required")
    @Column(nullable = false, precision = 10, scale = 7)
    private Double longitude;

    @NotNull(message = "Total slots is required")
    @Column(name = "total_slots", nullable = false)
    private Integer totalSlots;

    @NotNull(message = "Available slots is required")
    @Column(name = "available_slots", nullable = false)
    private Integer availableSlots;

    @NotNull(message = "Price per hour is required")
    @Column(name = "price_per_hour", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerHour;

    @Builder.Default
    @Column(length = 20)
    private String status = "OPEN";

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "OPEN";
        }
    }
}
