package com.example.restockbackend.dao;


import com.example.restockbackend.dao.entity.ThresholdEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThresholdRepo extends CrudRepository<ThresholdEntity, Long> {

}
