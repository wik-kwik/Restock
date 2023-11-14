package com.example.restockbackend.service;

import com.example.restockbackend.dao.UserRepo;
import com.example.restockbackend.dao.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    private UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public Optional<User> findById(Long id){
        return userRepo.findById(id);
    }

    public Iterable<User> findAll(){
        return userRepo.findAll();
    }

    public User save(User user){
        return userRepo.save(user);
    }

    public void deleteById(Long id){
        userRepo.deleteById(id);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void fillDB() {
        save(new User(1L, "Jan", "jan123", LocalDateTime.now(), LocalDateTime.now()));
        save(new User(2L, "Piotr", "piotr54321!", LocalDateTime.now(), LocalDateTime.now()));
    }
}
