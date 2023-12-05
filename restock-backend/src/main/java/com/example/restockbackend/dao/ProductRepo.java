package com.example.restockbackend.dao;

import com.example.restockbackend.dao.entity.ProductEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends CrudRepository<ProductEntity, Long> {
    @Query("SELECT pe FROM ProductEntity pe INNER JOIN OrderEntity oe ON oe.id = pe.orderId INNER JOIN UserEntity ue ON ue.username = :username AND ue.id = oe.userId")
    List<ProductEntity> findAllByUsername(@Param("username") String username);
}
