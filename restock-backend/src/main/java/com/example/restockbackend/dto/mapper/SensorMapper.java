package com.example.restockbackend.dto.mapper;

import com.example.restockbackend.dao.entity.SensorEntity;
import com.example.restockbackend.dto.domain.SensorDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SensorMapper extends BasicMapper<SensorDTO, SensorEntity> {
}
