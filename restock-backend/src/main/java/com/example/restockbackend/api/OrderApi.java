package com.example.restockbackend.api;

import com.example.restockbackend.dto.domain.OrderDTO;
import com.example.restockbackend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.example.restockbackend.dao.entity.OrderEntity.OrderStatus.ACCEPTED;
import static com.example.restockbackend.dao.entity.OrderEntity.OrderStatus.REJECTED;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class OrderApi {

    private final OrderService orderService;

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

    @PutMapping("/accept")
    public void acceptOrder(@RequestParam Long id) {
        orderService.changeStatus(id, ACCEPTED);
    }

    @PutMapping("/reject")
    public void rejectOrder(@RequestParam Long id) {
        orderService.changeStatus(id, REJECTED);
    }
}
