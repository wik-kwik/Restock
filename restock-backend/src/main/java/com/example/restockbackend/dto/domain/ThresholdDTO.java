package com.example.restockbackend.dto.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ThresholdDTO(@NotNull Long sensorId,
                           @NotBlank String type,
                           @NotNull Double value,
                           @NotNull LocalDateTime createDate,
                           LocalDateTime modifyDate) {
}
