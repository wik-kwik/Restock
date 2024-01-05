package com.example.restockbackend.dto.mapper;

import java.util.List;

public interface BasicMapper<DTO, E> {
    DTO toDto(E entity);

    E fromDto(DTO dto);

    Iterable<DTO> toDtoList(Iterable<E> entityList);
}
