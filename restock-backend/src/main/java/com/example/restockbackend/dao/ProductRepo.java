package com.example.restockbackend.dao;

import com.example.restockbackend.dao.entity.ProductEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends CrudRepository<ProductEntity, Long> {
}
