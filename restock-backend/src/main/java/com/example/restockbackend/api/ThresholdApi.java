package com.example.restockbackend.api;


import com.example.restockbackend.dto.domain.ThresholdDTO;
import com.example.restockbackend.service.ThresholdService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/thresholds")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ThresholdApi {

    private final ThresholdService thresholdService;

    @GetMapping("/all")
    public Iterable<ThresholdDTO> getAll() {
        return thresholdService.findAll();
    }

    @GetMapping("/sensor")
    public ThresholdDTO getBySensorId() {
        return thresholdService.getValueBySensorId();
    }

    @GetMapping
    public ThresholdDTO getById(@RequestParam Long id) {
        return thresholdService.findById(id);
    }

    @PostMapping
    public ThresholdDTO addThreshold(@RequestBody ThresholdDTO threshold) {
        return thresholdService.save(threshold);
    }

    @PutMapping
    public ThresholdDTO updateThreshold(@RequestBody ThresholdDTO threshold) {
        return thresholdService.save(threshold);
    }

    @DeleteMapping
    public void deleteThreshold(@RequestParam Long id) {
        thresholdService.deleteById(id);
    }
}
