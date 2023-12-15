package com.example.restockbackend.service;

import com.example.restockbackend.dao.ParameterRepo;
import com.example.restockbackend.dao.entity.ParameterEntity;
import com.example.restockbackend.dto.domain.ParameterDTO;
import com.example.restockbackend.dto.mapper.ParameterMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ParameterService {

    @Getter
    private final ParameterRepo parameterRepo;

    @Getter
    private final ParameterMapper parameterMapper;

    public ParameterDTO findByType(String type) {
        ParameterEntity parameterEntity = parameterRepo.getByType(type).orElseThrow(() -> new IllegalArgumentException("Parameter not found"));
        return parameterMapper.toDto(parameterEntity);
    }

    public ParameterDTO save(ParameterDTO parameter) {
        ParameterEntity parameterEntity = parameterMapper.fromDto(parameter);
        parameterEntity.setCreateDate(LocalDateTime.now());
        return parameterMapper.toDto(parameterRepo.save(parameterEntity));
    }

}
