package com.example.restockbackend.dao;


import com.example.restockbackend.dao.entity.ThresholdEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ThresholdRepo extends CrudRepository<ThresholdEntity, Long> {

    @Query("SELECT te.value FROM ThresholdEntity te WHERE te.type = 'U' AND te.sensorId = :id")
    double getValueBySensorId(Long id);

}
