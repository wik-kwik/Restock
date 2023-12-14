package com.example.restockbackend.dao.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    public interface OrderStatus {
        String PENDING = "P";
        String ACCEPTED = "A";
        String REJECTED = "R";
        String IN_DELIVERY = "D";
        String CLOSED = "C";
    }

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(nullable = false)
    @NotNull
    private String status;

    @Column(updatable = false, nullable = false)
    @NotBlank
    private String name;

    @Column
    private double price; // set after purchase

    @Column(updatable = false, nullable = false)
    @NotBlank
    private String offerId; // id from allegro

    @Column(updatable = false, nullable = false)
    private LocalDateTime createDate;

    @Column
    private LocalDateTime modifyDate;

    @Column
    private Long userId; // set after status changing

}
