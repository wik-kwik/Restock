package com.example.restockbackend.dao.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;

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

    @Column(nullable = false)
    private String macAddress;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String name;

    @Column
    private String product;

    @Column
    private String preferredBrand; // optional

    @Column
    private String preferredAmount; // optional: kg or numbers

    @Column(nullable = false, unique = true)
    @NotBlank
    @Length(min = 5, max = 30)
    private String sensorToken;

    @Column(updatable = false, nullable = false)
    private LocalDateTime createDate;

    @Column
    private LocalDateTime modifyDate;

    @Column
    private LocalDateTime removeDate;

}
