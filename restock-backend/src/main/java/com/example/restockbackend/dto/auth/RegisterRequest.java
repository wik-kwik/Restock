package com.example.restockbackend.dto.auth;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record RegisterRequest(@NotBlank @Length(min = 5, max = 30) String username, @NotBlank @Length(min = 8, max = 50) String password) {
}
