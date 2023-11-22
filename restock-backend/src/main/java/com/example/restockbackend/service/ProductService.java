package com.example.restockbackend.service;

import com.example.restockbackend.dao.ProductRepo;
import com.example.restockbackend.dao.entity.ProductEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    private ProductRepo productRepo;

    @Autowired
    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public Optional<ProductEntity> findById(Long id) {
        return productRepo.findById(id);
    }

    public Iterable<ProductEntity> findAll() {
        return productRepo.findAll();
    }

    public ProductEntity save(ProductEntity product) {
        return productRepo.save(product);
    }

    public void deleteById(Long id) {
        productRepo.deleteById(id);
    }

}
