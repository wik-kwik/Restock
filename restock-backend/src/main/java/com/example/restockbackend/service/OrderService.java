package com.example.restockbackend.service;

import com.example.restockbackend.dao.OrderRepo;
import com.example.restockbackend.dao.entity.OrderEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderService {

    private OrderRepo orderRepo;

    @Autowired
    public OrderService(OrderRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

    public Optional<OrderEntity> findById(Long id) {
        return orderRepo.findById(id);
    }

    public Iterable<OrderEntity> findAll() {
        return orderRepo.findAll();
    }

    public OrderEntity save(OrderEntity order) {
        return orderRepo.save(order);
    }

}