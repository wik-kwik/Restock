package com.example.restockbackend.api;


import com.example.restockbackend.dto.domain.ThresholdDTO;
import com.example.restockbackend.service.ThresholdService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/thresholds")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ThresholdApi {

    private final ThresholdService thresholdService;

    @GetMapping() // endpoint used only by sensors
    public ThresholdDTO getThresholdForUpdate() {
        return thresholdService.getValueForUpdate();
    }

}
