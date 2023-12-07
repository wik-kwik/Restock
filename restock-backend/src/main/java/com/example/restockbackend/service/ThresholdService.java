package com.example.restockbackend.service;

import com.example.restockbackend.dao.ThresholdRepo;
import com.example.restockbackend.dao.entity.ThresholdEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ThresholdService {

    private final ThresholdRepo thresholdRepo;

    @Autowired
    public ThresholdService(ThresholdRepo thresholdRepo) {
        this.thresholdRepo = thresholdRepo;
    }

    public Optional<ThresholdEntity> findById(Long id) {
        return thresholdRepo.findById(id);
    }

    public double getValueBySensorId(Long id) {
        return thresholdRepo.getValueBySensorId(id);
    }

    public Iterable<ThresholdEntity> findAll() {
        return thresholdRepo.findAll();
    }

    public ThresholdEntity save(ThresholdEntity threshold) {
        return thresholdRepo.save(threshold);
    }

    public void deleteById(Long id) {
        Optional<ThresholdEntity> existingThreshold = thresholdRepo.findById(id);
        if (existingThreshold.isPresent()) {
            ThresholdEntity deletedThreshold = existingThreshold.get();
            deletedThreshold.setRemoveDate(LocalDateTime.now());
            thresholdRepo.save(deletedThreshold);
        }
    }

}
