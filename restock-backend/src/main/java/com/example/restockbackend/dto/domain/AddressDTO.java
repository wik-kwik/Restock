package com.example.restockbackend.dto.domain;

public record AddressDTO(Long id,
                         String firstName,
                         String lastName,
                         String street,
                         String houseNumber,
                         String postalCode,
                         String city,
                         String phoneNumber,
                         String email) {
}
