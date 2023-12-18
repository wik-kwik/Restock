package com.example.restockbackend.dao;

import com.example.restockbackend.dao.entity.OrderEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends ListCrudRepository<OrderEntity, Long> {
    @Query("SELECT oe FROM OrderEntity oe WHERE oe.status IN :status")
    List<OrderEntity> findByStatusIn(@Param("status") String... status);

}
