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
@Table(name = "thresholds")
public class ThresholdEntity {

    public interface ThresholdType {
        String UPDATE = "U";
        String ORDER = "O";
    }

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sensor_id", updatable = false, nullable = false)
    private SensorEntity sensorEntity;

    @Column(updatable = false, nullable = false)
    private String type;

    @Column(nullable = false)
    private double value;

    @Column(updatable = false, nullable = false)
    private LocalDateTime createDate;

    @Column
    private LocalDateTime modifyDate;

    @Column
    private LocalDateTime removeDate;

}
