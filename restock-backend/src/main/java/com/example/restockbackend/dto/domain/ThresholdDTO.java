package com.example.restockbackend.dto.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ThresholdDTO(@NotNull Long sensorId,
                           @NotBlank String type,
                           @NotNull Double value) {
}
