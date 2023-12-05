package com.example.restockbackend.api;


import com.example.restockbackend.dao.entity.ThresholdEntity;
import com.example.restockbackend.service.ThresholdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/thresholds")
@CrossOrigin
public class ThresholdApi {

    private final ThresholdService thresholds;

    @Autowired
    public ThresholdApi(ThresholdService thresholdService) {
        this.thresholds = thresholdService;
    }

    @GetMapping("/all")
    public Iterable<ThresholdEntity> getAll() {
        return thresholds.findAll();
    }

    @GetMapping
    public Optional<ThresholdEntity> getById(@RequestParam Long id) {
        return thresholds.findById(id);
    }

    @PostMapping
    public ThresholdEntity addThreshold(@RequestBody ThresholdEntity threshold) {
        return thresholds.save(threshold);
    }

    @PutMapping
    public ThresholdEntity updateThreshold(@RequestBody ThresholdEntity threshold) {
        return thresholds.save(threshold);
    }

    @DeleteMapping
    public void deleteUser(@RequestParam Long index) {
        thresholds.deleteById(index);
    }
}
