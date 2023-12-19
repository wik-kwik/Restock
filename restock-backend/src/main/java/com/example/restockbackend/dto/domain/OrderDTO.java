package com.example.restockbackend.dto.domain;

public record OrderDTO(Long id,
                       String status,
                       String offerId,
                       String name,
                       String photoUrl,
                       double productPrice,
                       double deliveryPrice,
                       int smart
) {
}
