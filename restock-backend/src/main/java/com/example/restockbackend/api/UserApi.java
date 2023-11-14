package com.example.restockbackend.api;

import com.example.restockbackend.dao.entity.User;
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
    public Iterable<User> getAll() {
        return users.findAll();
    }

    @GetMapping
    public Optional<User> getById(@RequestParam Long index) {
        return users.findById(index);
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        return users.save(user);
    }

    @PutMapping
    public User updateUser(@RequestBody User user) {
        return users.save(user);
    }

    @DeleteMapping
    public void deleteUser(@RequestParam Long index) {
        users.deleteById(index);
    }
}
