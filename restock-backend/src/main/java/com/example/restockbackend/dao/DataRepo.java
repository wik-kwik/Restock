package com.example.restockbackend.dao;


import com.example.restockbackend.dao.entity.DataEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataRepo extends ListCrudRepository<DataEntity, Long> {
}
