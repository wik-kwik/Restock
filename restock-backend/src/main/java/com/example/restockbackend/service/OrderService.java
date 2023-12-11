package com.example.restockbackend.service;

import com.example.restockbackend.dao.OrderRepo;
import com.example.restockbackend.dao.UserRepo;
import com.example.restockbackend.dao.entity.OrderEntity;
import com.example.restockbackend.dao.entity.UserEntity;
import com.example.restockbackend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepo orderRepo;
    private final UserRepo userRepo;

    @Autowired
    public OrderService(OrderRepo orderRepo, UserRepo userRepo) {
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
    }

    public Optional<OrderEntity> findById(Long id) {
        return orderRepo.findById(SecurityUtils.unwrapUsername(), id);
    }

    public Iterable<OrderEntity> findAll() {
        return orderRepo.findAllByUsername(SecurityUtils.unwrapUsername());
    }

    public OrderEntity save(OrderEntity order) {
        Optional<UserEntity> user = userRepo.findByUsername(SecurityUtils.unwrapUsername());
        order.setUserId(user.orElseThrow(() -> new UsernameNotFoundException("Cannot determinate user name")).getId());
        return orderRepo.save(order);
    }

}