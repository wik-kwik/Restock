package com.example.restockbackend.service;

import com.example.restockbackend.dao.ThresholdRepo;
import com.example.restockbackend.dao.entity.ThresholdEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ThresholdService {

    private ThresholdRepo thresholdRepo;

    @Autowired
    public ThresholdService(ThresholdRepo thresholdRepo) {
        this.thresholdRepo = thresholdRepo;
    }

    public Optional<ThresholdEntity> findById(Long id) {
        return thresholdRepo.findById(id);
    }

    public Iterable<ThresholdEntity> findAll() {
        return thresholdRepo.findAll();
    }

    public ThresholdEntity save(ThresholdEntity threshold) {
        return thresholdRepo.save(threshold);
    }

    public void deleteById(Long id) {
        thresholdRepo.deleteById(id);
    }

}
