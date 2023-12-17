package com.example.restockbackend.dao;

import com.example.restockbackend.dao.entity.ParameterEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParameterRepo extends ListCrudRepository<ParameterEntity, Long> {

    Optional<ParameterEntity> getByType(String type);

}
