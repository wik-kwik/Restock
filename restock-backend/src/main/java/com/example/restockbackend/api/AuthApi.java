package com.example.restockbackend.api;

import com.example.restockbackend.dto.auth.JwtAuthResponse;
import com.example.restockbackend.dto.auth.LoginRequest;
import com.example.restockbackend.dto.auth.RegisterRequest;
import com.example.restockbackend.dto.auth.RegisterResponse;
import com.example.restockbackend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.AuthenticationException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthApi {
    private final AuthService authService;

    @PostMapping("/login")
    public JwtAuthResponse login(@RequestBody LoginRequest loginRequest) throws AuthenticationException {
        return authService.login(loginRequest);
    }

    @PostMapping("/register")
    public RegisterResponse login(@RequestBody RegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }

}
