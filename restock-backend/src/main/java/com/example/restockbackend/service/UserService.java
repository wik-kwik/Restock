package com.example.restockbackend.service;

import com.example.restockbackend.dao.UserRepo;
import com.example.restockbackend.dao.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    private UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public Optional<UserEntity> findById(Long id){
        return userRepo.findById(id);
    }

    public Iterable<UserEntity> findAll(){
        return userRepo.findAll();
    }

    public UserEntity save(UserEntity user){
        return userRepo.save(user);
    }

    public void deleteById(Long id){
        userRepo.deleteById(id);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void fillDB() {
        save(new UserEntity(null, "Jan", "jan123", LocalDateTime.now(), null, null));
        save(new UserEntity(null, "Piotr", "piotr54321!", LocalDateTime.now(), null, null));
    }
}
