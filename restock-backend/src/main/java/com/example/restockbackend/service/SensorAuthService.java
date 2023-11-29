package com.example.restockbackend.service;

import com.example.restockbackend.dao.SensorRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class SensorAuthService {
    private final Logger LOGGER = LoggerFactory.getLogger(SensorAuthService.class);
    private final SensorRepo sensorRepo;

    public SensorAuthService(SensorRepo sensorRepo) {
        this.sensorRepo = sensorRepo;
    }

    public boolean validateSensorToken(String token) {
        return sensorRepo.findBySensorToken(token).isPresent();
    }

}
