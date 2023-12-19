package com.example.restockbackend.dto.domain;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OrderDTO(@NotNull String status,
                       @NotBlank String name,
                       double price,
                       @NotBlank String offerId
) {
}
