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

    public ThresholdDTO getValueForUpdate() {
        Optional<ThresholdEntity> thresholdOpt = thresholdRepo.getValueForUpdate(SecurityUtils.unwrapSensorToken());
        ThresholdEntity thresholdEntity = thresholdOpt.orElseThrow(() -> new IllegalArgumentException("Not found!"));
        return thresholdMapper.toDto(thresholdEntity);
    }

}
