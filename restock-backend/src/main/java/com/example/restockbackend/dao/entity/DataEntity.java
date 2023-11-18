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
@Table(name = "sensor_data")
public class DataEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(updatable = false, nullable = false)
    private Long sensorId;

    @Column(nullable = false)
    private String value;

    @Column(updatable = false, nullable = false)
    private LocalDateTime createDate;
}
