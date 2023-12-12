package com.example.restockbackend.dto.domain;

import com.example.restockbackend.dao.enums.OrderStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record OrderDTO(@NotNull OrderStatus status,
                       @NotBlank String name,
                       double price,
                       @NotBlank String offerId,
                       LocalDateTime createDate,
                       LocalDateTime modifyDate
) {
}
