package com.parkease.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "parking_slots")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "parking_lot_id", nullable = false)
    private ParkingLot parkingLot;

    @NotBlank(message = "Slot number is required")
    @Column(name = "slot_number", nullable = false, length = 20)
    private String slotNumber;

    @Column(name = "slot_type", length = 30)
    private String slotType = "NORMAL";

    @Column(length = 20)
    private String status = "AVAILABLE";
}
