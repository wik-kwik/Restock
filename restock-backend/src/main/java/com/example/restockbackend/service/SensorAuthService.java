package com.example.restockbackend.service;

import com.example.restockbackend.dao.SensorRepo;
import org.springframework.stereotype.Service;

@Service
public class SensorAuthService {

    private final SensorRepo sensorRepo;

    public SensorAuthService(SensorRepo sensorRepo) {
        this.sensorRepo = sensorRepo;
    }

    public boolean validateSensorToken(String token) {
        return sensorRepo.findBySensorTokenAndRemoveDateIsNull(token).isPresent();
    }

}
