package com.example.restockbackend.api;

import com.example.restockbackend.dto.domain.OrderDTO;
import com.example.restockbackend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "https://localhost:3000")
@RequiredArgsConstructor
public class OrderApi {

    private final OrderService orderService;

    @GetMapping("/all")
    public Iterable<OrderDTO> getAll() {
        return orderService.findAll();
    }

    @GetMapping("/pending")
    public Iterable<OrderDTO> getPendingOrders() {
        return orderService.findPendingOrders();
    }

    @GetMapping("/history")
    public Iterable<OrderDTO> getOrdersHistory() {
        return orderService.findOrdersHistory();
    }

    @GetMapping
    public OrderDTO getById(@RequestParam Long id) {
        return orderService.findById(id);
    }

    @PostMapping
    public OrderDTO addOrder(@RequestBody OrderDTO order) {
        return orderService.save(order);
    }

    @PutMapping
    public OrderDTO updateOrder(@RequestBody OrderDTO order) {
        return orderService.save(order);
    }

}
