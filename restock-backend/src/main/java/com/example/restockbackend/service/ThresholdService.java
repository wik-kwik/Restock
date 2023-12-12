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
import java.util.stream.Collectors;

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

    public ThresholdDTO getValueBySensorId() {
        Optional<ThresholdEntity> thresholdOpt = thresholdRepo.getValueBySensorId(SecurityUtils.unwrapSensorToken());
        ThresholdEntity thresholdEntity = thresholdOpt.orElseThrow(() -> new IllegalArgumentException("Not found!"));
        return thresholdMapper.toDto(thresholdEntity);
    }

    public Iterable<ThresholdDTO> findAll() {
        return thresholdRepo.findAll()
                .stream()
                .map(thresholdMapper::toDto)
                .collect(Collectors.toList());
    }

    public ThresholdDTO save(ThresholdDTO threshold) {
        ThresholdEntity thresholdEntity = thresholdMapper.fromDto(threshold);
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
