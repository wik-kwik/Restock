package com.example.restockbackend.dao.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ThresholdTypes {

    UPDATE("U"),
    ORDER("O");

    private final String code;

}
