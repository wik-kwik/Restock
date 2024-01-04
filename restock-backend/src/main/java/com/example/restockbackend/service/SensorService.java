package com.example.restockbackend.service;

import com.example.restockbackend.dao.SensorRepo;
import com.example.restockbackend.dao.ThresholdRepo;
import com.example.restockbackend.dao.entity.SensorEntity;
import com.example.restockbackend.dao.entity.ThresholdEntity;
import com.example.restockbackend.dto.auth.NewSensorRequest;
import com.example.restockbackend.dto.auth.NewSensorResponse;
import com.example.restockbackend.dto.domain.SensorDTO;
import com.example.restockbackend.dto.mapper.SensorMapper;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.example.restockbackend.dao.entity.ThresholdEntity.ThresholdType.*;

@Service
@AllArgsConstructor
public class SensorService {

    private static final int TOKEN_LENGTH = 25;
    private static final String NEW_SENSOR_NAME = "NEW SENSOR";

    private final SensorRepo sensorRepo;
    private final SensorMapper sensorMapper;

    private final ThresholdRepo thresholdRepo;

    public Iterable<SensorDTO> findAll() {
        return sensorRepo.findByRemoveDateIsNull()
                .stream()
                .map(sensorMapper::toDto)
                .collect(Collectors.toList());
    }

    public SensorDTO findById(Long id) {
        SensorEntity sensorEntity = sensorRepo.findByIdAndRemoveDateIsNull(id).orElseThrow(() -> new IllegalArgumentException("Sensor not found"));
        return sensorMapper.toDto(sensorEntity);
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

            sensorRepo.save(sensorEntity);
            createThresholdsForSensor(sensorEntity);

            return new NewSensorResponse(sensorEntity.getSensorToken());
        }
    }

    public SensorDTO save(SensorDTO sensor) {
        Optional<SensorEntity> sensorOpt = sensorRepo.findByIdAndRemoveDateIsNull(sensor.id());
        SensorEntity sensorEntity = sensorOpt.orElseThrow(() -> new IllegalArgumentException("Sensor not found"));
        sensorEntity.setName(sensor.name());
        sensorEntity.setProduct(sensor.product());
        sensorEntity.setPreferredBrand(sensor.preferredBrand());
        sensorEntity.setPreferredAmount(sensor.preferredAmount());
        sensorEntity.setModifyDate(LocalDateTime.now());

        ThresholdEntity thresholdForUpdate = sensorEntity.getThresholds().stream()
                .filter(t -> t.getType().equals(UPDATE))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Threshold for update not found"));
        thresholdForUpdate.setValue(sensor.thresholdForUpdate());
        thresholdForUpdate.setModifyDate(LocalDateTime.now());

        ThresholdEntity thresholdForOrder = sensorEntity.getThresholds().stream()
                .filter(t -> t.getType().equals(ORDER))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Threshold for order not found"));
        thresholdForOrder.setValue(sensor.thresholdForOrder());
        thresholdForOrder.setModifyDate(LocalDateTime.now());

        return sensorMapper.toDto(sensorRepo.save(sensorEntity));
    }

    public void deleteById(Long id) {
        Optional<SensorEntity> existingSensor = sensorRepo.findByIdAndRemoveDateIsNull(id);
        if (existingSensor.isPresent()) {
            SensorEntity deletedSensor = existingSensor.get();
            deletedSensor.setRemoveDate(LocalDateTime.now());
            deletedSensor.getThresholds().forEach(t -> t.setRemoveDate(LocalDateTime.now()));
            sensorRepo.save(deletedSensor);
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

    private void createThresholdsForSensor(SensorEntity sensorEntity) {
        Stream.of(ThresholdEntity.ThresholdType.UPDATE, ORDER).forEach(type -> {
            ThresholdEntity thresholdEntity = new ThresholdEntity();
            thresholdEntity.setSensorEntity(sensorEntity);
            thresholdEntity.setType(type);
            thresholdEntity.setCreateDate(LocalDateTime.now());

            if (SensorEntity.SensorType.PHYSICAL_BUTTON.equals(sensorEntity.getType())) {
                thresholdEntity.setValue(1);
            }

            thresholdRepo.save(thresholdEntity);
        });
    }

}
