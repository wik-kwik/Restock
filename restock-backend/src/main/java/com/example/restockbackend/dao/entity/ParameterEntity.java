package com.example.restockbackend.dao.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class ParameterEntity {

    public interface ParameterType {
        String SMART = "S";

        String SUPER_SELLER = "B";

        String BRAND_ZONE = "Z";

        String SHIPPING_FORM = "F";
    }

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(nullable = false)
    @NotBlank
    private String type;

    @Column(nullable = false)
    @NotBlank
    private String value;

    @Column(updatable = false, nullable = false)
    private LocalDateTime createDate;

    @Column
    private LocalDateTime modifyDate;

}
