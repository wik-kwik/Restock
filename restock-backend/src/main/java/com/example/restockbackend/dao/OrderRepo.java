package com.example.restockbackend.dao;

import com.example.restockbackend.dao.entity.OrderEntity;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface OrderRepo extends ListCrudRepository<OrderEntity, Long> {

    List<OrderEntity> findByStatusIn(Collection<String> status);

    boolean existsByStatusInAndOfferId(Collection<String> status, String offerId);

}
