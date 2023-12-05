package com.example.restockbackend.dao.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ParameterTypes {
    SMART("S"),
    SUPER_SELLER("B"),
    CAN_BE_REPACKED("R"),
    BRANDS_ZONE("Z"),
    SHIPPING_FORM("F"),
    SHIPPING_ADDRESS("A"),
    SHIPPING_POINT("P"),
    MASTER_IP_ADDRESS("I");

    private final String code;
}
