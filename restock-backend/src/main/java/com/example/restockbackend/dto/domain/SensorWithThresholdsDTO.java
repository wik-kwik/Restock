package com.example.restockbackend.dto.domain;

import com.example.restockbackend.dao.entity.ThresholdEntity;

public record SensorWithThresholdsDTO(SensorDTO sensorDTO, Iterable<ThresholdEntity> thresholds) {
}