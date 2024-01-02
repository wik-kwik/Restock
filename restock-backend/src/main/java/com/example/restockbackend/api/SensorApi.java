package com.example.restockbackend.api;


import com.example.restockbackend.dto.auth.NewSensorRequest;
import com.example.restockbackend.dto.domain.SensorWithThresholdsDTO;
import com.example.restockbackend.dto.domain.SensorDTO;
import com.example.restockbackend.dto.auth.NewSensorResponse;
import com.example.restockbackend.service.SensorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sensors")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class SensorApi {

    private final SensorService sensorService;

    @GetMapping("/all")
    public Iterable<SensorDTO> getAll() {
        return sensorService.findAll();
    }

    @GetMapping
    public SensorWithThresholdsDTO getSensorWithThresholdsById(@RequestParam Long id) {
        return sensorService.findSensorWithThresholdsById(id);
    }

    @PostMapping
    public NewSensorResponse addSensor(@RequestBody NewSensorRequest newSensor) {
        return sensorService.register(newSensor);
    }

    @PutMapping
    public SensorDTO updateSensor(@RequestBody SensorDTO sensor) {
        return sensorService.save(sensor);
    }

    @DeleteMapping
    public void deleteSensor(@RequestParam Long id) {
        sensorService.deleteById(id);
    }
}
