package com.example.restockbackend.service;

import com.example.restockbackend.dao.AddressRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepo addressRepo;

}
