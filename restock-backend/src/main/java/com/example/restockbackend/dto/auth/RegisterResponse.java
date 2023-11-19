package com.example.restockbackend.dto.auth;

import java.time.LocalDateTime;

public record RegisterResponse(String username, LocalDateTime createdAt) {
}
