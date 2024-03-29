package com.example.restockbackend.service;

import com.example.restockbackend.allegro.AllegroClient;
import com.example.restockbackend.allegro.Offer;
import com.example.restockbackend.dao.DataRepo;
import com.example.restockbackend.dao.SensorRepo;
import com.example.restockbackend.dao.entity.DataEntity;
import com.example.restockbackend.dao.entity.SensorEntity;
import com.example.restockbackend.dto.domain.DataDTO;
import com.example.restockbackend.dto.mapper.DataMapper;
import com.example.restockbackend.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

import static com.example.restockbackend.dao.entity.ThresholdEntity.ThresholdType.ORDER;
import static com.example.restockbackend.dao.entity.ThresholdEntity.ThresholdType.UPDATE;

@Service
@RequiredArgsConstructor
public class DataService {

    private final Logger LOGGER = LoggerFactory.getLogger(DataService.class);

    private final DataRepo dataRepo;

    private final DataMapper dataMapper;

    private final SensorRepo sensorRepo;

    private final OrderService orderService;

    public DataDTO save(DataDTO data) {
        DataEntity dataEntity = dataMapper.fromDto(data);
        Optional<SensorEntity> sensorEntityOpt = sensorRepo.findBySensorTokenAndRemoveDateIsNull(SecurityUtils.unwrapSensorToken());
        SensorEntity sensor = sensorEntityOpt.orElseThrow(() -> new IllegalArgumentException("Sensor not found"));
        dataEntity.setSensorId(sensor.getId());
        dataEntity.setCreateDate(LocalDateTime.now());
        processData(sensor.getId(), data.value());
        return dataMapper.toDto(dataRepo.save(dataEntity));
    }

    private void processData(Long sensorId, double dataValue) {
        Optional<SensorEntity> sensorOpt = sensorRepo.findByIdAndRemoveDateIsNull(sensorId);

        if (sensorOpt.isEmpty()) {
            return;
        }

        SensorEntity sensor = sensorOpt.get();
        double thresholdValue = sensor.getThresholds().stream().filter(t -> t.getType().equals(ORDER)).findFirst().orElseThrow().getValue();
        if (sensor.getProduct() != null && dataValue >= thresholdValue) {
            try {
                Offer offer = AllegroClient.getInstance().getTheBestOffer(sensor.getProduct(), sensor.getPreferredBrand(), sensor.getPreferredAmount());
                if (offer != null && !orderService.existsOpenOrderWithOfferId(offer.getId())) {
                    orderService.createNewOrder(offer);
                }
            } catch (IOException | ParseException e) {
                LOGGER.info("Error during parsing JSON with Allegro offers");
            }

        }
    }

}
