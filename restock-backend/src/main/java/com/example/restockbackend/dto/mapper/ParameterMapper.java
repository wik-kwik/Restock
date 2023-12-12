package com.example.restockbackend.dto.mapper;

import com.example.restockbackend.dao.entity.ParameterEntity;
import com.example.restockbackend.dto.domain.ParameterDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ParameterMapper extends BasicMapper<ParameterDTO, ParameterEntity> {
}
