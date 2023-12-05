package com.example.restockbackend.service;

import com.example.restockbackend.dao.UserRepo;
import com.example.restockbackend.dao.entity.UserEntity;
import com.example.restockbackend.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public Optional<UserEntity> findById(Long id) {
        return userRepo.findById(id);
    }

    public UserEntity save(UserEntity user) {
        return userRepo.save(user);
    }

    public void deleteById(Long id) {
        Optional<UserEntity> existingUser = userRepo.findById(id);
        if (existingUser.isPresent()) {
            UserEntity deletedUser = existingUser.get();
            deletedUser.setRemoveDate(LocalDateTime.now());
            userRepo.save(deletedUser);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Cannot find user: " + username));
        return mapToUserDetails(user);
    }

    private UserDetails mapToUserDetails(UserEntity user) {
        return new UserDetailsImpl(
                user.getUsername(),
                user.getPassword()
        );
    }
}
