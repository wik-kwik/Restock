package com.example.restockbackend.dao.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "parameters")
public class ParameterEntity {

    public interface ParameterType {
        String SMART = "S";

        String SUPER_SELLER = "B";

        String BRAND_ZONE = "Z";

        String SHIPPING_FORM = "F";
    }

    public interface BooleanValue {
        String TRUE = "T";

        String FALSE = "F";
    }

    public interface ShippingForm {
        String PACZKOMAT = "P";

        String KURIER = "K";

        String ANY = "A";
    }

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String value;

    @Column(updatable = false, nullable = false)
    private LocalDateTime createDate;

    @Column
    private LocalDateTime modifyDate;

}
