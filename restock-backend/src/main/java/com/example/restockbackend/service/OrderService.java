package com.example.restockbackend.service;

import com.example.restockbackend.allegro.Offer;
import com.example.restockbackend.dao.OrderRepo;
import com.example.restockbackend.dao.UserRepo;
import com.example.restockbackend.dao.entity.OrderEntity;
import com.example.restockbackend.dao.entity.UserEntity;
import com.example.restockbackend.dto.domain.OrderDTO;
import com.example.restockbackend.dto.mapper.OrderMapper;
import com.example.restockbackend.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
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

    public Iterable<OrderDTO> findPendingOrders() {
        return orderRepo.findByStatusIn(Arrays.asList(ACCEPTED, IN_DELIVERY, PENDING))
                .stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    public Iterable<OrderDTO> findOrdersHistory() {
        return orderRepo.findByStatusIn(Arrays.asList(CLOSED, REJECTED))
                .stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    public boolean existsOpenOrderWithOfferId(String offerId) {
        return orderRepo.existsByStatusInAndOfferId(Arrays.asList(ACCEPTED, IN_DELIVERY, PENDING), offerId);
    }

    public void changeStatus(Long id, String status) {
        Optional<OrderEntity> orderOpt = orderRepo.findById(id);
        Optional<UserEntity> userOpt = userRepo.findByUsernameAndRemoveDateIsNull(SecurityUtils.unwrapUsername());

        if (orderOpt.isPresent() && !orderOpt.get().getStatus().equals(PENDING)) {
            throw new IllegalArgumentException("Order status cannot be changed - forbidden for other status than PENDING!");
        }

        if (orderOpt.isPresent() && userOpt.isPresent()) {
            OrderEntity orderEntity = orderOpt.get();
            UserEntity userEntity = userOpt.get();

            orderEntity.setStatus(status);
            orderEntity.setUserId(userEntity.getId());
            orderEntity.setModifyDate(LocalDateTime.now());

            orderRepo.save(orderEntity);
        } else {
            throw new IllegalArgumentException("Order or user not found!");
        }
    }

    public void createNewOrder(Offer offer) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setStatus(PENDING);
        orderEntity.setOfferId(offer.getId());
        orderEntity.setName(offer.getName());
        orderEntity.setPhotoUrl(offer.getPhotoURL());
        orderEntity.setProductPrice(offer.getProductPrice());
        orderEntity.setDeliveryPrice(offer.getDeliveryPrice());
        orderEntity.setSmart(offer.isSmart() ? 1 : 0);
        orderEntity.setCreateDate(LocalDateTime.now());
        orderRepo.save(orderEntity);
    }

}