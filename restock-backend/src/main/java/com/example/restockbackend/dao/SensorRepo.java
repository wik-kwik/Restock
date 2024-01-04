package com.example.restockbackend.dao;


import com.example.restockbackend.dao.entity.SensorEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SensorRepo extends ListCrudRepository<SensorEntity, Long> {

    Optional<SensorEntity> findBySensorTokenAndRemoveDateIsNull(String token);

    Optional<SensorEntity> findByMacAddressAndRemoveDateIsNull(String mac);

    Optional<SensorEntity> findByIdAndRemoveDateIsNull(Long id);

    List<SensorEntity> findByRemoveDateIsNull();

}
