package com.example.restockbackend.api;

import com.example.restockbackend.dto.domain.DataDTO;
import com.example.restockbackend.service.DataService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/data")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class DataApi {

    private final DataService dataService;

    @GetMapping("/all")
    public Iterable<DataDTO> getAll() {
        return dataService.findAll();
    }

    @GetMapping
    public DataDTO getById(@RequestParam Long id) {
        return dataService.findById(id);
    }

    @PostMapping
    public DataDTO addData(@RequestBody @Valid DataDTO data) {
        return dataService.save(data);
    }
}
