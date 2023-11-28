package com.example.restockbackend.api;

import com.example.restockbackend.dao.entity.ProductEntity;
import com.example.restockbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductApi {

    private ProductService productService;

    @Autowired
    public ProductApi(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public Iterable<ProductEntity> getAll() {
        return productService.findAll();
    }

    @GetMapping
    public Optional<ProductEntity> getById(@RequestParam Long id) {
        return productService.findById(id);
    }

    @PostMapping
    public ProductEntity addProduct(@RequestBody ProductEntity product) {
        return productService.save(product);
    }

    @PutMapping
    public ProductEntity updateProduct(@RequestBody ProductEntity product) {
        return productService.save(product);
    }

}