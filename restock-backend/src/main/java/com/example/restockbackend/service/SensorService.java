package com.example.restockbackend.service;

import com.example.restockbackend.dao.SensorRepo;
import com.example.restockbackend.dao.entity.SensorEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class SensorService {

    private SensorRepo sensorRepo;

    @Autowired
    public SensorService(SensorRepo sensorRepo) {
        this.sensorRepo = sensorRepo;
    }

    public Optional<SensorEntity> findById(Long id) {
        return sensorRepo.findById(id);
    }

    public Iterable<SensorEntity> findAll() {
        return sensorRepo.findAll();
    }

    public SensorEntity save(SensorEntity sensor) {
        return sensorRepo.save(sensor);
    }

    public void deleteById(Long id) {
        Optional<SensorEntity> existingSensor = sensorRepo.findById(id);
        if (existingSensor.isPresent()) {
            SensorEntity deletedSensor = existingSensor.get();
            deletedSensor.setRemoveDate(LocalDateTime.now());
            sensorRepo.save(deletedSensor);
        }
    }

}
