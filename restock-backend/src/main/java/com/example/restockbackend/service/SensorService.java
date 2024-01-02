package com.example.restockbackend.service;

import com.example.restockbackend.dao.SensorRepo;
import com.example.restockbackend.dao.ThresholdRepo;
import com.example.restockbackend.dao.entity.SensorEntity;
import com.example.restockbackend.dao.entity.ThresholdEntity;
import com.example.restockbackend.dto.auth.NewSensorRequest;
import com.example.restockbackend.dto.auth.NewSensorResponse;
import com.example.restockbackend.dto.domain.SensorDTO;
import com.example.restockbackend.dto.domain.SensorWithThresholdsDTO;
import com.example.restockbackend.dto.domain.ThresholdDTO;
import com.example.restockbackend.dto.mapper.SensorMapper;
import com.example.restockbackend.dto.mapper.ThresholdMapper;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class SensorService {

    private static final int TOKEN_LENGTH = 25;
    private static final String NEW_SENSOR_NAME = "NEW SENSOR";

    private final SensorRepo sensorRepo;
    private final SensorMapper sensorMapper;

    private final ThresholdRepo thresholdRepo;
    private final ThresholdMapper thresholdMapper;

    public SensorDTO findById(Long id) {
        Optional<SensorEntity> sensorOpt = sensorRepo.findByIdAndRemoveDateIsNull(id);
        SensorEntity sensorEntity = sensorOpt.orElseThrow(() -> new IllegalArgumentException("Sensor not found"));
        return sensorMapper.toDto(sensorEntity);
    }

    public Iterable<SensorDTO> findAll() {
        return sensorRepo.findByRemoveDateIsNull()
                .stream()
                .map(sensorMapper::toDto)
                .collect(Collectors.toList());
    }

    public SensorWithThresholdsDTO findSensorWithThresholdsById(Long id) {
        Optional<SensorEntity> sensorOpt = sensorRepo.findByIdAndRemoveDateIsNull(id);
        if (sensorOpt.isPresent()) {
            SensorEntity sensorEntity = sensorOpt.get();
            SensorDTO sensorDTO = sensorMapper.toDto(sensorEntity);

            Iterable<ThresholdEntity> thresholds = thresholdRepo.findAllBySensorIdAndRemoveDateIsNull(id);
            Iterable<ThresholdDTO> thresholdDTOs = thresholdMapper.toDtoList(thresholds);

            return new SensorWithThresholdsDTO(
                    sensorDTO,
                    thresholdDTOs);
        } else {
            throw new IllegalArgumentException("Sensor not found");
        }
    }

    public NewSensorResponse register(NewSensorRequest newSensor) {
        Optional<SensorEntity> sensorOpt = sensorRepo.findByMacAddressAndRemoveDateIsNull(newSensor.mac());
        if (sensorOpt.isPresent()) {
            return new NewSensorResponse(sensorOpt.get().getSensorToken());
        } else {
            SensorEntity sensorEntity = new SensorEntity();
            sensorEntity.setMacAddress(newSensor.mac());
            sensorEntity.setType(newSensor.type());
            sensorEntity.setName(NEW_SENSOR_NAME);
            sensorEntity.setSensorToken(generateNewToken());
            sensorEntity.setCreateDate(LocalDateTime.now());

            Long newSensorId = sensorRepo.save(sensorEntity).getId();
            createThresholdsForSensor(newSensorId, newSensor.type());

            return new NewSensorResponse(sensorEntity.getSensorToken());
        }
    }

    public SensorDTO save(SensorDTO sensor) {
        SensorEntity sensorEntity = sensorMapper.fromDto(sensor);
        sensorEntity.setModifyDate(LocalDateTime.now());
        return sensorMapper.toDto(sensorRepo.save(sensorEntity));
    }

    public void deleteById(Long id) {
        Optional<SensorEntity> existingSensor = sensorRepo.findByIdAndRemoveDateIsNull(id);
        if (existingSensor.isPresent()) {
            SensorEntity deletedSensor = existingSensor.get();
            deletedSensor.setRemoveDate(LocalDateTime.now());
            sensorRepo.save(deletedSensor);
            deleteRelatedThresholds(deletedSensor.getId());
        }
    }

    private String generateNewToken() {
        String token = null;
        List<String> existingTokens = sensorRepo.findAll().stream().map(SensorEntity::getSensorToken).toList();
        while (token == null || existingTokens.contains(token)) {
            token = RandomStringUtils.random(TOKEN_LENGTH, true, true);
        }
        return token;
    }

    private void createThresholdsForSensor(Long sensorId, String sensorType) {
        Stream.of(ThresholdEntity.ThresholdType.UPDATE, ThresholdEntity.ThresholdType.ORDER).forEach(type -> {
            ThresholdEntity thresholdEntity = new ThresholdEntity();
            thresholdEntity.setSensorId(sensorId);
            thresholdEntity.setType(type);
            thresholdEntity.setCreateDate(LocalDateTime.now());

            if (SensorEntity.SensorType.PHYSICAL_BUTTON.equals(sensorType)) {
                thresholdEntity.setValue(1);
            }

            thresholdRepo.save(thresholdEntity);
        });
    }

    private void deleteRelatedThresholds(Long sensorId) {
        Iterable<ThresholdEntity> thresholds = thresholdRepo.findAllBySensorIdAndRemoveDateIsNull(sensorId);
        for (ThresholdEntity threshold: thresholds) {
            threshold.setRemoveDate(LocalDateTime.now());
            thresholdRepo.save(threshold);
        }
    }

}
