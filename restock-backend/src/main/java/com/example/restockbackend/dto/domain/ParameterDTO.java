package com.example.restockbackend.dto.domain;


public record ParameterDTO(Long id,
                           String type,
                           String value) {
    public String getType() {
        return type;
    }

    public String getValue() {
        return value;
    }
}
