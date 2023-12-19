package com.example.restockbackend.api;

import com.example.restockbackend.dto.domain.AddressDTO;
import com.example.restockbackend.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/address")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AddressApi {

    private final AddressService addressService;

    @GetMapping("/all")
    public Iterable<AddressDTO> getAll() {
        return addressService.findAll();
    }

    @GetMapping
    public AddressDTO getById(@RequestParam Long id) {
        return addressService.findById(id);
    }

    @PutMapping
    public AddressDTO addAddress(@RequestBody AddressDTO address) {
        return addressService.save(address);
    }
}
