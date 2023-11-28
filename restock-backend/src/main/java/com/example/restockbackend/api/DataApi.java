package com.example.restockbackend.api;

import com.example.restockbackend.dao.entity.DataEntity;
import com.example.restockbackend.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/data")
@CrossOrigin
public class DataApi {

    private DataService dataServices;

    @Autowired
    public DataApi(DataService dataService) {
        this.dataServices = dataService;
    }

    @GetMapping("/all")
    public Iterable<DataEntity> getAll() {
        return dataServices.findAll();
    }

    @GetMapping
    public Optional<DataEntity> getById(@RequestParam Long id) {
        return dataServices.findById(id);
    }

    @PostMapping
    public DataEntity addData(@RequestBody DataEntity data) {
        return dataServices.save(data);
    }
}
