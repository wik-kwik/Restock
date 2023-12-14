package com.example.restockbackend.service;

import com.example.restockbackend.dao.SensorRepo;
import com.example.restockbackend.dao.ThresholdRepo;
import com.example.restockbackend.dao.entity.SensorEntity;
import com.example.restockbackend.dao.entity.ThresholdEntity;
import com.example.restockbackend.dto.domain.SensorDTO;
import com.example.restockbackend.dto.mapper.SensorMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SensorService {

    private final SensorRepo sensorRepo;
    private final SensorMapper sensorMapper;

    private final ThresholdRepo thresholdRepo;

    public SensorDTO findById(Long id) {
        Optional<SensorEntity> sensorOpt = sensorRepo.findById(id);
        SensorEntity sensorEntity = sensorOpt.orElseThrow(() -> new IllegalArgumentException("Sensor not found"));
        return sensorMapper.toDto(sensorEntity);
    }

    public Iterable<SensorDTO> findAll() {
        return sensorRepo.findAll()
                .stream()
                .map(sensorMapper::toDto)
                .collect(Collectors.toList());
    }

    public SensorDTO save(SensorDTO sensor) {
        SensorEntity sensorEntity = sensorMapper.fromDto(sensor);
        return sensorMapper.toDto(sensorRepo.save(sensorEntity));
    }

    public void deleteById(Long id) {
        Optional<SensorEntity> existingSensor = sensorRepo.findById(id);
        if (existingSensor.isPresent()) {
            SensorEntity deletedSensor = existingSensor.get();
            deletedSensor.setRemoveDate(LocalDateTime.now());
            sensorRepo.save(deletedSensor);
            deleteRelatedThresholds(deletedSensor.getId());
        }
    }

    private void deleteRelatedThresholds(Long sensorId) {
        Iterable<ThresholdEntity> thresholds = thresholdRepo.getAllBySensorId(sensorId);
        for (ThresholdEntity threshold: thresholds) {
            threshold.setRemoveDate(LocalDateTime.now());
            thresholdRepo.save(threshold);
        }
    }

}
