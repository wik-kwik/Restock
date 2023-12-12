package com.example.restockbackend.dto.domain;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public record ParameterDTO(@NotBlank String type,
                           @NotBlank String value,
                           LocalDateTime createDate,
                           LocalDateTime modifyDate) {
}
