package com.example.restockbackend.dto.domain;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record SensorDTO(Long id,
                        String name,
                        String product,
                        String preferredBrand,
                        String preferredAmount,
                        @NotBlank @Length(min = 5, max = 30) String sensorToken) {
}
