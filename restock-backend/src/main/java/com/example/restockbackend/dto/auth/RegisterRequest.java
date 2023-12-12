package com.example.restockbackend.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record RegisterRequest(@NotBlank @Length(min = 5) String username, @NotBlank @Length(min = 10) String password) {
}
