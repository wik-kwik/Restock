package com.example.restockbackend.dao;

import com.example.restockbackend.dao.entity.OrderEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends CrudRepository<OrderEntity, Long> {
}
