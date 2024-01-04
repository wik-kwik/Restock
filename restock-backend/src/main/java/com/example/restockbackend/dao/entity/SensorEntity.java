package com.example.restockbackend.dao.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sensors")
public class SensorEntity {

    public interface SensorType {
        String DISTANCE_SENSOR = "D";
        String PHYSICAL_BUTTON = "B";
    }

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(updatable = false, nullable = false)
    private String macAddress;

    @Column(updatable = false, nullable = false)
    private String type;

    @Column(nullable = false)
    private String name;

    @Column
    private String product;

    @Column
    private String preferredBrand;

    @Column
    private String preferredAmount; // e.g. kg or numbers

    @OneToMany(mappedBy = "sensorEntity")
    private List<ThresholdEntity> thresholds;

    @Column(updatable = false, nullable = false)
    private String sensorToken;

    @Column(updatable = false, nullable = false)
    private LocalDateTime createDate;

    @Column
    private LocalDateTime modifyDate;

    @Column
    private LocalDateTime removeDate;

}
