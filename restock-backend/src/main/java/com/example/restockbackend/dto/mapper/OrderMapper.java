package com.example.restockbackend.dto.mapper;

import com.example.restockbackend.dao.entity.OrderEntity;
import com.example.restockbackend.dto.domain.OrderDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper extends BasicMapper<OrderDTO, OrderEntity>{
}
