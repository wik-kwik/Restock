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
@Table(name = "users")
public class UserEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column(nullable = false, unique = true)
    @NotBlank
    @Length(min = 5, max = 30)
    private String username;

    @Column(nullable = false)
    @NotBlank
    @Length(min = 8)
    private String password;

    @Column(updatable = false, nullable = false)
    private LocalDateTime createDate;

    @Column
    private LocalDateTime modifyDate;

    @Column
    private LocalDateTime removeDate;

}
