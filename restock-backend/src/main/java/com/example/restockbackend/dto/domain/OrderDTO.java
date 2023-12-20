package com.example.restockbackend.dto.domain;

import java.time.LocalDateTime;

public record OrderDTO(Long id,
                       String status,
                       String offerId,
                       String name,
                       String photoUrl,
                       double productPrice,
                       double deliveryPrice,
                       int smart,
                       LocalDateTime createDate
) {
}
