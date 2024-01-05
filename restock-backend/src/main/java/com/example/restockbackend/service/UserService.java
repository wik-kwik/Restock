package com.example.restockbackend.service;

import com.example.restockbackend.dao.UserRepo;
import com.example.restockbackend.dao.entity.UserEntity;
import com.example.restockbackend.dto.mapper.UserMapper;
import com.example.restockbackend.security.UserDetailsImpl;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepo userRepo;

    public boolean existsByUsername(String username) {
        return userRepo.findByUsernameAndRemoveDateIsNull(username).isPresent();
    }

    public UserEntity save(UserEntity user) {
        user.setCreateDate(LocalDateTime.now());
        return userRepo.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepo.findByUsernameAndRemoveDateIsNull(username).orElseThrow(() -> new UsernameNotFoundException("Cannot find user: " + username));
        return mapToUserDetails(user);
    }

    private UserDetails mapToUserDetails(UserEntity user) {
        return new UserDetailsImpl(
                user.getUsername(),
                user.getPassword()
        );
    }
}
