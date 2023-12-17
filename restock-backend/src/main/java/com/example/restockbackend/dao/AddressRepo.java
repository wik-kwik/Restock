package com.example.restockbackend.dao;

import com.example.restockbackend.dao.entity.AddressEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepo extends ListCrudRepository<AddressEntity, Long> {

}
