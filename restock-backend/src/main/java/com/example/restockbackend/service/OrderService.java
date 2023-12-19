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

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.example.restockbackend.dao.entity.OrderEntity.OrderStatus.*;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepo orderRepo;
    private final UserRepo userRepo;
    private final OrderMapper orderMapper;

    public OrderDTO findById(Long id) {
        Optional<OrderEntity> orderOpt = orderRepo.findById(id);
        return orderMapper.toDto(
                orderOpt.orElseThrow(() -> new IllegalArgumentException("Order not found!"))
        );
    }

    public Iterable<OrderDTO> findAll() {
        return orderRepo.findAll()
                .stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    public Iterable<OrderDTO> findPendingOrders() {
        return orderRepo.findByStatusIn(SecurityUtils.unwrapUsername(), ACCEPTED, IN_DELIVERY, PENDING)
                .stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    public Iterable<OrderDTO> findOrdersHistory() {
        return orderRepo.findByStatusIn(SecurityUtils.unwrapUsername(), CLOSED, REJECTED)
                .stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    public void acceptOrder(Long id) {
        Optional<OrderEntity> orderOpt = orderRepo.findById(id);
        Optional<UserEntity> userOpt = userRepo.findByUsername(SecurityUtils.unwrapUsername());

        if (orderOpt.isPresent() && userOpt.isPresent()) {
            OrderEntity orderEntity = orderOpt.get();
            UserEntity userEntity = userOpt.get();

            orderEntity.setStatus(ACCEPTED);
            orderEntity.setUserId(userEntity.getId());
            orderEntity.setModifyDate(LocalDateTime.now());

            orderRepo.save(orderEntity);
        } else {
            throw new IllegalArgumentException("Order or user not found!");
        }
    }

    public void rejectOrder(Long id) {
        Optional<OrderEntity> orderOpt = orderRepo.findById(id);
        Optional<UserEntity> userOpt = userRepo.findByUsername(SecurityUtils.unwrapUsername());

        if (orderOpt.isPresent() && userOpt.isPresent()) {
            OrderEntity orderEntity = orderOpt.get();
            UserEntity userEntity = userOpt.get();

            orderEntity.setStatus(REJECTED);
            orderEntity.setUserId(userEntity.getId());
            orderEntity.setModifyDate(LocalDateTime.now());

            orderRepo.save(orderEntity);
        } else {
            throw new IllegalArgumentException("Order or user not found!");
        }
    }

    public OrderDTO save(OrderDTO order) {
        OrderEntity orderEntity = orderMapper.fromDto(order);
        Optional<UserEntity> user = userRepo.findByUsername(SecurityUtils.unwrapUsername());
        orderEntity.setUserId(user.orElseThrow(() -> new UsernameNotFoundException("Cannot determinate user name")).getId());
        orderEntity.setCreateDate(LocalDateTime.now());
        return orderMapper.toDto(orderRepo.save(orderEntity));
    }

}