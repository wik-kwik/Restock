package com.example.restockbackend.dto.mapper;

import com.example.restockbackend.dao.entity.DataEntity;
import com.example.restockbackend.dto.domain.DataDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DataMapper extends BasicMapper<DataDTO, DataEntity> {
}
