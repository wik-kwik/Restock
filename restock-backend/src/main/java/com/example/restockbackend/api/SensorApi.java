package com.example.restockbackend.api;


import com.example.restockbackend.dao.entity.SensorEntity;
import com.example.restockbackend.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/sensors")
@CrossOrigin(origins = "http://localhost:3000")
public class SensorApi {

    private final SensorService sensors;

    @Autowired
    public SensorApi(SensorService sensorService) {
        this.sensors = sensorService;
    }

    @GetMapping("/all")
    public Iterable<SensorEntity> getAll() {
        return sensors.findAll();
    }

    @GetMapping
    public Optional<SensorEntity> getById(@RequestParam Long id) {
        return sensors.findById(id);
    }

    @PostMapping
    public SensorEntity addSensor(@RequestBody SensorEntity sensor) {
        return sensors.save(sensor);
    }

    @PutMapping
    public SensorEntity updateSensor(@RequestBody SensorEntity sensor) {
        return sensors.save(sensor);
    }

    @DeleteMapping
    public void deleteSensor(@RequestParam Long id) {
        sensors.deleteById(id);
    }
}
