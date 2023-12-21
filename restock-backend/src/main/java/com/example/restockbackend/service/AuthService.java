package com.example.restockbackend.service;

import com.example.restockbackend.dao.entity.UserEntity;
import com.example.restockbackend.dto.auth.JwtAuthResponse;
import com.example.restockbackend.dto.auth.LoginRequest;
import com.example.restockbackend.dto.auth.RegisterRequest;
import com.example.restockbackend.dto.auth.RegisterResponse;
import com.example.restockbackend.security.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public RegisterResponse register(RegisterRequest registerRequest) {
        if (userService.existsByUsername(registerRequest.username())) {
            throw new IllegalArgumentException("User with name \"" + registerRequest.username() + "\" already exists!");
        }
        UserEntity user = new UserEntity();
        user.setUsername(registerRequest.username());
        user.setPassword(passwordEncoder.encode(registerRequest.password()));
        user.setCreateDate(LocalDateTime.now());
        userService.save(user);
        return new RegisterResponse(user.getUsername(), user.getCreateDate());
    }

    public JwtAuthResponse login(LoginRequest loginRequest) throws AuthenticationException {
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password())
        );
        if (!authenticate.isAuthenticated()) {
            throw new AuthenticationException();
        }
        String jwt = jwtService.generateToken((UserDetailsImpl) authenticate.getPrincipal());
        return new JwtAuthResponse(jwt);
    }

}
