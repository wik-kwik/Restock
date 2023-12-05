package com.example.restockbackend.dao.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum OrderStatus {

    PENDING("P"),
    ACCEPTED("A"),
    REJECTED("R"),
    IN_DELIVERY("D"),
    CLOSED("C");

    private final String code;
}
