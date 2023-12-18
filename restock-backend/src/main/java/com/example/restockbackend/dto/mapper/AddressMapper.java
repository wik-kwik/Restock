package com.example.restockbackend.dto.mapper;

import com.example.restockbackend.dao.entity.AddressEntity;
import com.example.restockbackend.dto.domain.AddressDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper extends BasicMapper<AddressDTO, AddressEntity> {
}

