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

    @GetMapping("/all")
    public Iterable<UserEntity> getAll() {
        return users.findAll();
    }

    @GetMapping
    public Optional<UserEntity> getById(@RequestParam Long index) {
        return users.findById(index);
    }

    @PostMapping
    public UserEntity addUser(@RequestBody UserEntity user) {
        return users.save(user);
    }

    @PutMapping
    public UserEntity updateUser(@RequestBody UserEntity user) {
        return users.save(user);
    }

    @DeleteMapping
    public void deleteUser(@RequestParam Long index) {
        users.deleteById(index);
    }
}
