package com.example.restockbackend.service;

import com.example.restockbackend.dao.AddressRepo;
import com.example.restockbackend.dao.entity.AddressEntity;
import com.example.restockbackend.dto.domain.AddressDTO;
import com.example.restockbackend.dto.mapper.AddressMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepo addressRepo;
    private final AddressMapper addressMapper;

    public AddressDTO findById(Long id) {
        AddressEntity addressEntity = addressRepo.findById(id).orElse(new AddressEntity());
        return addressMapper.toDto(addressEntity);
    }

    public AddressDTO save(AddressDTO address) {
        AddressEntity addressEntity = addressMapper.fromDto(address);
        if (addressRepo.existsById(address.id())) {
            if (address.equals(addressMapper.toDto(addressRepo.findById(address.id()).get()))) {
                return address;
            } else {
                addressEntity.setModifyDate(LocalDateTime.now());
            }
        } else {
            addressEntity.setCreateDate(LocalDateTime.now());
        }
        return addressMapper.toDto(addressRepo.save(addressEntity));
    }

}
