package com.example.restockbackend.api;

import com.example.restockbackend.dto.domain.ParameterDTO;
import com.example.restockbackend.service.ParameterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parameters")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ParameterApi {

    private final ParameterService parameterService;

    @GetMapping("/all")
    public Iterable<ParameterDTO> getAllParameters() {
        return parameterService.findAllParameters();
    }

    @PutMapping
    public List<ParameterDTO> updateAllParameters(@RequestBody List<ParameterDTO> parameterList) {
        return parameterService.updateParameters(parameterList);
    }
}
