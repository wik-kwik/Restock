package com.example.restockbackend.dto.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record DataDTO(Long sensorId, @NotBlank String value, LocalDateTime createDate) {
}
