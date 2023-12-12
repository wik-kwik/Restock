package com.example.restockbackend.dto.domain;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;

public record UserDTO(@NotBlank @Length(min = 5, max = 30) String username,
                      @NotBlank @Length(min = 8, max = 50) String password,
                      LocalDateTime createDate,
                      LocalDateTime modifyDate) {
}
