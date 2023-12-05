package com.example.restockbackend.api;

import com.example.restockbackend.dao.entity.OrderEntity;
import com.example.restockbackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderApi {

    private final OrderService orderService;

    @Autowired
    public OrderApi(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/all")
    public Iterable<OrderEntity> getAll() {
        return orderService.findAll();
    }

    @GetMapping
    public Optional<OrderEntity> getById(@RequestParam Long id) {
        return orderService.findById(id);
    }

    @PostMapping
    public OrderEntity addOrder(@RequestBody OrderEntity order) {
        return orderService.save(order);
    }

    @PutMapping
    public OrderEntity updateOrder(@RequestBody OrderEntity order) {
        return orderService.save(order);
    }

}
