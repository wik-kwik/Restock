package com.example.restockbackend.api;

import com.example.restockbackend.dto.auth.JwtAuthResponse;
import com.example.restockbackend.dto.auth.LoginRequest;
import com.example.restockbackend.dto.auth.RegisterRequest;
import com.example.restockbackend.dto.auth.RegisterResponse;
import com.example.restockbackend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import javax.naming.AuthenticationException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthApi {
    private final AuthService authService;

    @PostMapping("/login")
    public JwtAuthResponse login(@RequestBody @Valid LoginRequest loginRequest) throws AuthenticationException {
        return authService.login(loginRequest);
    }

    @PostMapping("/register")
    public RegisterResponse login(@RequestBody @Valid RegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }

}
