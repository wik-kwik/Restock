package com.example.restockbackend.dto.mapper;

import com.example.restockbackend.dao.entity.SensorEntity;
import com.example.restockbackend.dto.domain.SensorDTO;
import org.mapstruct.Mapper;

import static com.example.restockbackend.dao.entity.ThresholdEntity.ThresholdType.*;

@Mapper(componentModel = "spring")
public interface SensorMapper extends BasicMapper<SensorDTO, SensorEntity> {

    @Override
    default SensorDTO toDto(SensorEntity entity) {
        if (entity == null) {
            return null;
        }

        return new SensorDTO(
                entity.getId(),
                entity.getName(),
                entity.getProduct(),
                entity.getPreferredBrand(),
                entity.getPreferredAmount(),
                entity.getThresholds().stream()
                        .filter(t -> t.getType().equals(UPDATE))
                        .findFirst()
                        .orElseThrow(() -> new IllegalArgumentException("Threshold for update not found"))
                        .getValue(),
                entity.getThresholds().stream()
                        .filter(t -> t.getType().equals(ORDER))
                        .findFirst()
                        .orElseThrow(() -> new IllegalArgumentException("Threshold for order not found"))
                        .getValue()
        );
    }

}
