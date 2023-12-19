package com.example.restockbackend.service;

import com.example.restockbackend.allegro.AllegroClient;
import com.example.restockbackend.allegro.Offer;
import com.example.restockbackend.dao.DataRepo;
import com.example.restockbackend.dao.SensorRepo;
import com.example.restockbackend.dao.ThresholdRepo;
import com.example.restockbackend.dao.entity.DataEntity;
import com.example.restockbackend.dao.entity.SensorEntity;
import com.example.restockbackend.dao.entity.ThresholdEntity;
import com.example.restockbackend.dto.domain.DataDTO;
import com.example.restockbackend.dto.mapper.DataMapper;
import com.example.restockbackend.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DataService {

    private final DataRepo dataRepo;

    private final DataMapper dataMapper;

    private final SensorRepo sensorRepo;

    private final ThresholdRepo thresholdRepo;

    private final OrderService orderService;

    public DataDTO findById(Long id) {
        DataEntity dataEntity = dataRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Data not found"));
        return dataMapper.toDto(dataEntity);
    }

    public List<DataDTO> findAll() {
        return dataRepo.findAll()
                .stream()
                .map(dataMapper::toDto)
                .collect(Collectors.toList());
    }

    public DataDTO save(DataDTO data) {
        DataEntity dataEntity = dataMapper.fromDto(data);
        Optional<SensorEntity> sensorEntityOpt = sensorRepo.findBySensorToken(SecurityUtils.unwrapSensorToken());
        SensorEntity sensor = sensorEntityOpt.orElseThrow(() -> new IllegalArgumentException("Sensor not found"));
        dataEntity.setSensorId(sensor.getId());
        dataEntity.setCreateDate(LocalDateTime.now());
        processData(sensor.getId(), data.value());
        return dataMapper.toDto(dataRepo.save(dataEntity));
    }

    private void processData(Long sensorId, double dataValue) {
        Optional<ThresholdEntity> thresholdOpt = thresholdRepo.getValueForOrder(sensorId);
        Optional<SensorEntity> sensorOpt = sensorRepo.findById(sensorId);
        if (thresholdOpt.isEmpty() || sensorOpt.isEmpty()) {
            return;
        }

        double thresholdValue = thresholdOpt.get().getValue();
        SensorEntity sensor = sensorOpt.get();
        if(dataValue <= thresholdValue) {
            try {
                Offer offer = AllegroClient.getInstance().getTheBestOffer(sensor.getProductName(), sensor.getPreferredBrand(), sensor.getPreferredAmount());
                if (offer != null) {
                    orderService.createNewOrder(offer);
                }
            } catch (Exception ignored) {
            }
        }
    }

}
