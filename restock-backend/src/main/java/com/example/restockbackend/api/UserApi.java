package com.example.restockbackend.api;

import com.example.restockbackend.dao.entity.UserEntity;
import com.example.restockbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserApi {

    private final UserService userService;

    @GetMapping
    public Optional<UserEntity> getById(@RequestParam Long id) {
        return userService.findById(id);
    }

    @PutMapping
    public UserEntity updateUser(@RequestBody UserEntity user) {
        return userService.save(user);
    }

    @DeleteMapping
    public void deleteUser(@RequestParam Long id) {
        userService.deleteById(id);
    }
}
