package com.example.restockbackend.dto.domain;

import jakarta.validation.constraints.NotBlank;

public record DataDTO(Long sensorId, @NotBlank String value) {
}
