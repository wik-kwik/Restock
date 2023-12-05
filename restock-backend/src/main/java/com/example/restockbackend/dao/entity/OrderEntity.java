package com.example.restockbackend.dao.entity;

import com.example.restockbackend.dao.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class OrderEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Column(updatable = false, nullable = false)
    private LocalDateTime createDate;

    @Column
    private LocalDateTime modifyDate;

    @Column
    private Long userId;

}
