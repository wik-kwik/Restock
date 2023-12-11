package com.example.restockbackend.dao.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sensors")
public class SensorEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private String productName;

    @Column
    private String preferredBrand; // optional

    @Column
    private String preferredAmount; // optional: kg or numbers

    @Column(nullable = false, unique = true)
    private String sensorToken;

    @Column(updatable = false, nullable = false)
    private LocalDateTime createDate;

    @Column
    private LocalDateTime modifyDate;

    @Column
    private LocalDateTime removeDate;

}
