package com.example.restockbackend.service;

import com.example.restockbackend.dao.DataRepo;
import com.example.restockbackend.dao.SensorRepo;
import com.example.restockbackend.dao.entity.DataEntity;
import com.example.restockbackend.dao.entity.SensorEntity;
import com.example.restockbackend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class DataService {

    private final DataRepo dataRepo;
    private final SensorRepo sensorRepo;

    @Autowired
    public DataService(DataRepo dataRepo, SensorRepo sensorRepo) {
        this.dataRepo = dataRepo;
        this.sensorRepo = sensorRepo;
    }

    public Optional<DataEntity> findById(Long id) {
        return dataRepo.findById(id);
    }

    public Iterable<DataEntity> findAll() {
        return dataRepo.findAll();
    }

    public DataEntity save(DataEntity data) {
        Optional<SensorEntity> sensorEntityOpt = sensorRepo.findBySensorToken(SecurityUtils.unwrapSensorToken());
        SensorEntity sensor = sensorEntityOpt.orElseThrow(() -> new IllegalArgumentException("Sensor not found"));
        data.setSensorId(sensor.getId());
        data.setCreateDate(LocalDateTime.now());
        return dataRepo.save(data);
    }
}
