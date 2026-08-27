package com.parkease.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SlotStatusUpdateRequest {
    @NotBlank(message = "Slot status is required")
    private String status;
}
