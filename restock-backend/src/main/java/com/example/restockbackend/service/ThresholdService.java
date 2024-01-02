package com.example.restockbackend.service;

import com.example.restockbackend.dao.ThresholdRepo;
import com.example.restockbackend.dao.entity.ThresholdEntity;
import com.example.restockbackend.dto.domain.ThresholdDTO;
import com.example.restockbackend.dto.mapper.ThresholdMapper;
import com.example.restockbackend.security.SecurityUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ThresholdService {

    private final ThresholdRepo thresholdRepo;
    private final ThresholdMapper thresholdMapper;

    public ThresholdDTO findById(Long id) {
        Optional<ThresholdEntity> thresholdOpt = thresholdRepo.findById(id);
        ThresholdEntity thresholdEntity = thresholdOpt.orElseThrow(() -> new IllegalArgumentException("Not found!"));
        return thresholdMapper.toDto(thresholdEntity);
    }

    public ThresholdDTO getValueForUpdate() {
        Optional<ThresholdEntity> thresholdOpt = thresholdRepo.getValueForUpdate(SecurityUtils.unwrapSensorToken());
        ThresholdEntity thresholdEntity = thresholdOpt.orElseThrow(() -> new IllegalArgumentException("Not found!"));
        return thresholdMapper.toDto(thresholdEntity);
    }

    public ThresholdDTO save(ThresholdDTO threshold) {
        ThresholdEntity thresholdEntity = thresholdMapper.fromDto(threshold);;
        if (thresholdRepo.existsById(threshold.id())) {
            thresholdEntity.setModifyDate(LocalDateTime.now());
        } else {
            thresholdEntity.setCreateDate(LocalDateTime.now());
        }
        return thresholdMapper.toDto(thresholdRepo.save(thresholdEntity));
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
