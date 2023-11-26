package com.example.restockbackend.service;

import com.example.restockbackend.dao.DataRepo;
import com.example.restockbackend.dao.entity.DataEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DataService {

    private DataRepo dataRepo;

    @Autowired
    public DataService(DataRepo dataRepo) {
        this.dataRepo = dataRepo;
    }

    public Optional<DataEntity> findById(Long id) {
        return dataRepo.findById(id);
    }

    public Iterable<DataEntity> findAll() {
        return dataRepo.findAll();
    }

    public DataEntity save(DataEntity data) {
        return dataRepo.save(data);
    }

    public void deleteById(Long id) {
        dataRepo.deleteById(id);
    }

}
