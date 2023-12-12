package com.example.restockbackend.dto.mapper;

import com.example.restockbackend.dao.entity.ThresholdEntity;
import com.example.restockbackend.dto.domain.ThresholdDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ThresholdMapper extends BasicMapper<ThresholdDTO, ThresholdEntity> {
}
