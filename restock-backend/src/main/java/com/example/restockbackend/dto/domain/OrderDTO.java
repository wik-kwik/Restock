package com.example.restockbackend.dto.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record OrderDTO(@NotNull String status,
                       @NotBlank String name,
                       double price,
                       @NotBlank String offerId,
                       LocalDateTime createDate,
                       LocalDateTime modifyDate
) {
}
