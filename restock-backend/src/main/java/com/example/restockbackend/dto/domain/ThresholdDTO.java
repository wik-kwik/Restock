package com.example.restockbackend.dto.domain;

public record ThresholdDTO(Long id,
                           Long sensorId,
                           String type,
                           double value) {
}
