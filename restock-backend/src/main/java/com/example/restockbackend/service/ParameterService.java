package com.example.restockbackend.service;

import com.example.restockbackend.allegro.AllegroClient;
import com.example.restockbackend.dao.ParameterRepo;
import com.example.restockbackend.dao.entity.ParameterEntity;
import com.example.restockbackend.dto.domain.ParameterDTO;
import com.example.restockbackend.dto.mapper.ParameterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ParameterService {

    private final ParameterRepo parameterRepo;

    private final ParameterMapper parameterMapper;

    public ParameterDTO findByType(String type) {
        ParameterEntity parameterEntity = parameterRepo.getByType(type).orElseThrow(() -> new IllegalArgumentException("Parameter not found"));
        return parameterMapper.toDto(parameterEntity);
    }

    public ParameterDTO save(ParameterDTO parameter) {
        ParameterEntity parameterEntity = parameterMapper.fromDto(parameter);
        parameterEntity.setModifyDate(LocalDateTime.now());
        ParameterDTO parameterDTO = parameterMapper.toDto(parameterRepo.save(parameterEntity));
        loadParameters();
        return parameterDTO;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void loadParameters() {
        List<ParameterEntity> parameters = parameterRepo.findAll();
        parameters.forEach(p -> AllegroClient.getInstance().addFilter(p.getType(), p.getValue()));
    }

}
