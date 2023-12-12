package com.example.restockbackend.dao;


import com.example.restockbackend.dao.entity.ThresholdEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ThresholdRepo extends ListCrudRepository<ThresholdEntity, Long> {

    @Query("SELECT te FROM ThresholdEntity te INNER JOIN SensorEntity se WHERE se.id = te.sensorId and te.type = 'U' AND se.sensorToken = :sensorToken")
    Optional<ThresholdEntity> getValueBySensorId(String sensorToken);

}
