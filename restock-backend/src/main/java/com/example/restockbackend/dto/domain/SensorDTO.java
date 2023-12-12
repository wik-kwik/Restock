package com.example.restockbackend.dto.domain;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;

public record SensorDTO(@NotBlank String model,
                        @NotBlank String productName,
                        String preferredBrand,
                        String preferredAmount,
                        @NotBlank @Length(min = 5, max = 30) String sensorToken,
                        LocalDateTime createDate,
                        LocalDateTime modifyDate) {
}
