package com.example.restockbackend.api;

import com.example.restockbackend.dao.entity.UserEntity;
import com.example.restockbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserApi {

    private UserService users;

    @Autowired
    public UserApi(UserService userService) {
        this.users = userService;
    }

    @GetMapping
    public Optional<UserEntity> getById(@RequestParam Long id) {
        return users.findById(id);
    }

    @PutMapping
    public UserEntity updateUser(@RequestBody UserEntity user) {
        return users.save(user);
    }

    @DeleteMapping
    public void deleteUser(@RequestParam Long id) {
        users.deleteById(id);
    }
}
