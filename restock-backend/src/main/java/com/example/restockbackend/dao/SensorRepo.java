package com.example.restockbackend.dao;


import com.example.restockbackend.dao.entity.SensorEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface SensorRepo extends ListCrudRepository<SensorEntity, Long> {

    Optional<SensorEntity> findBySensorToken(String token);

    Optional<SensorEntity> findByMacAddress(String mac);

}
