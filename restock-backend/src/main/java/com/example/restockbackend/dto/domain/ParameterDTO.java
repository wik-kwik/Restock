package com.example.restockbackend.dto.domain;

import jakarta.validation.constraints.NotBlank;

public record ParameterDTO(@NotBlank String type,
                           @NotBlank String value) {
}
