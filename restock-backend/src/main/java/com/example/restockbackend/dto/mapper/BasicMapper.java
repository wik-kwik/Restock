package com.example.restockbackend.dto.mapper;

public interface BasicMapper<DTO, E> {
    DTO toDto(E entity);

    E fromDto(DTO dto);
}
