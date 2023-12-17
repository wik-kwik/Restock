package com.example.restockbackend.api;


import com.example.restockbackend.dto.domain.SensorDTO;
import com.example.restockbackend.service.SensorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sensors")
@CrossOrigin(origins = "https://localhost:3000")
@RequiredArgsConstructor
public class SensorApi {

    private final SensorService sensorService;

    @GetMapping("/all")
    public Iterable<SensorDTO> getAll() {
        return sensorService.findAll();
    }

    @GetMapping
    public SensorDTO getById(@RequestParam Long id) {
        return sensorService.findById(id);
    }

    @PostMapping
    public SensorDTO addSensor(@RequestBody SensorDTO sensor) {
        return sensorService.save(sensor);
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
