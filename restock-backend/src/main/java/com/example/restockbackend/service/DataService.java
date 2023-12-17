package com.example.restockbackend.service;

import com.example.restockbackend.dao.DataRepo;
import com.example.restockbackend.dao.SensorRepo;
import com.example.restockbackend.dao.entity.DataEntity;
import com.example.restockbackend.dao.entity.SensorEntity;
import com.example.restockbackend.dto.domain.DataDTO;
import com.example.restockbackend.dto.mapper.DataMapper;
import com.example.restockbackend.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DataService {

    private final DataRepo dataRepo;
    private final SensorRepo sensorRepo;
    private final DataMapper dataMapper;

    public DataDTO findById(Long id) {
        DataEntity dataEntity = dataRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Data not found"));
        return dataMapper.toDto(dataEntity);
    }

    public List<DataDTO> findAll() {
        return dataRepo.findAll()
                .stream()
                .map(dataMapper::toDto)
                .collect(Collectors.toList());
    }

    public DataDTO save(DataDTO data) {
        DataEntity dataEntity = dataMapper.fromDto(data);
        Optional<SensorEntity> sensorEntityOpt = sensorRepo.findBySensorToken(SecurityUtils.unwrapSensorToken());
        SensorEntity sensor = sensorEntityOpt.orElseThrow(() -> new IllegalArgumentException("Sensor not found"));
        dataEntity.setSensorId(sensor.getId());
        dataEntity.setCreateDate(LocalDateTime.now());
        return dataMapper.toDto(dataRepo.save(dataEntity));
    }

}
