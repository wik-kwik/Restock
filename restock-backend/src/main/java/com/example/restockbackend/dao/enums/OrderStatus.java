package com.example.restockbackend.dao.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OrderStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    IN_DELIVERY,
    CLOSED
}
