package com.example.restockbackend.dao;


import com.example.restockbackend.dao.entity.ThresholdEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ThresholdRepo extends ListCrudRepository<ThresholdEntity, Long> {

    @Query("SELECT te FROM ThresholdEntity te INNER JOIN SensorEntity se ON se.id = te.sensorId WHERE te.removeDate IS NULL AND te.type = 'U' AND se.sensorToken = :sensorToken")
    Optional<ThresholdEntity> getValueForUpdate(String sensorToken);

    @Query("SELECT te FROM ThresholdEntity te INNER JOIN SensorEntity se ON se.id = te.sensorId WHERE te.removeDate IS NULL AND te.type = 'O' AND se.sensorToken = :sensorToken")
    Optional<ThresholdEntity> getValueForOrder(String sensorToken);

    Iterable<ThresholdEntity> findAllBySensorId(Long id);

}
