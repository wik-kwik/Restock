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
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ParameterService {

    private final ParameterRepo parameterRepo;

    private final ParameterMapper parameterMapper;

    public Iterable<ParameterDTO> findAllParameters() {
        return parameterRepo.findAll()
                .stream()
                .map(parameterMapper::toDto)
                .collect(Collectors.toList());
    }

    public Iterable<ParameterDTO> updateParameters(List<ParameterDTO> parameterList) {
        List<ParameterEntity> updatedParameters = new ArrayList<>();
        for (ParameterDTO parameter : parameterList) {
            ParameterEntity parameterEntity = parameterRepo.getByType(parameter.getType())
                    .orElseThrow(() -> new IllegalArgumentException("Parameter not found"));

            parameterEntity.setValue(parameter.getValue());
            parameterEntity.setModifyDate(LocalDateTime.now());

            updatedParameters.add(parameterRepo.save(parameterEntity));
        }
        Iterable<ParameterDTO> parameterDTOS =  parameterMapper.toDtoList(updatedParameters);
        loadParameters();
        return parameterDTOS;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void loadParameters() {
        List<ParameterEntity> parameters = parameterRepo.findAll();
        parameters.forEach(p -> AllegroClient.getInstance().addFilter(p.getType(), p.getValue()));
    }

}
