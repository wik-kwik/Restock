package com.example.restockbackend.service;

import com.example.restockbackend.dao.OrderRepo;
import com.example.restockbackend.dao.UserRepo;
import com.example.restockbackend.dao.entity.OrderEntity;
import com.example.restockbackend.dao.entity.UserEntity;
import com.example.restockbackend.dto.domain.OrderDTO;
import com.example.restockbackend.dto.mapper.OrderMapper;
import com.example.restockbackend.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepo orderRepo;
    private final UserRepo userRepo;
    private final OrderMapper orderMapper;

    public OrderDTO findById(Long id) {
        Optional<OrderEntity> orderOpt = orderRepo.findById(SecurityUtils.unwrapUsername(), id);
        return orderMapper.toDto(
                orderOpt.orElseThrow(() -> new IllegalArgumentException("Order not found!"))
        );
    }

    public Iterable<OrderDTO> findAll() {
        return orderRepo.findAllByUsername(SecurityUtils.unwrapUsername())
                .stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    public OrderDTO save(OrderDTO order) {
        OrderEntity orderEntity = orderMapper.fromDto(order);
        Optional<UserEntity> user = userRepo.findByUsername(SecurityUtils.unwrapUsername());
        orderEntity.setUserId(user.orElseThrow(() -> new UsernameNotFoundException("Cannot determinate user name")).getId());
        return orderMapper.toDto(orderRepo.save(orderEntity));
    }

}