package com.example.restockbackend.dao;


import com.example.restockbackend.dao.entity.SensorEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface SensorRepo extends CrudRepository<SensorEntity, Long> {
    Optional<SensorEntity> findBySensorToken(String token);
}
