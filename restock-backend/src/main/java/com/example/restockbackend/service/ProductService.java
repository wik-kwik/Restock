package com.example.restockbackend.service;

import com.example.restockbackend.dao.ProductRepo;
import com.example.restockbackend.dao.UserRepo;
import com.example.restockbackend.dao.entity.ProductEntity;
import com.example.restockbackend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepo productRepo;
    private final UserRepo userRepo;

    @Autowired
    public ProductService(ProductRepo productRepo, UserRepo userRepo) {
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }

    public Optional<ProductEntity> findById(Long id) {
        return productRepo.findById(id);
    }

    public Iterable<ProductEntity> findAll() {
        return productRepo.findAllByUsername(SecurityUtils.unwrapUsername());
    }

    public ProductEntity save(ProductEntity product) {
        userRepo.findByUsername(SecurityUtils.unwrapUsername());
        return productRepo.save(product);
    }
}
