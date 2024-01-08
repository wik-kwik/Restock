package com.example.restockbackend.dto.domain;

public record SensorDTO(Long id,
                        String type,
                        String name,
                        String product,
                        String preferredBrand,
                        String preferredAmount,
                        double thresholdForUpdate,
                        double thresholdForOrder) {
}
