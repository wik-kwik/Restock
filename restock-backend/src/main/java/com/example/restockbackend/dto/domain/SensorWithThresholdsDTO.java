package com.example.restockbackend.dto.domain;

    public record SensorWithThresholdsDTO(SensorDTO sensor,
                                      Iterable<ThresholdDTO> thresholds) {
}