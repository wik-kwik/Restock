package com.example.restockbackend.dao;

import com.example.restockbackend.dao.entity.OrderEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepo extends CrudRepository<OrderEntity, Long> {
    @Query("SELECT oe FROM OrderEntity oe INNER JOIN UserEntity ue ON ue.username = :username AND oe.userId = ue.id")
    List<OrderEntity> findAllByUsername(@Param("username") String username);

    @Query("SELECT oe FROM OrderEntity oe INNER JOIN UserEntity ue ON ue.username = :username AND oe.userId = ue.id AND oe.status IN :status")
    List<OrderEntity> findByStatusIn(@Param("username") String username, @Param("status") String... status);

    @Query("SELECT oe FROM OrderEntity oe INNER JOIN UserEntity ue ON ue.username = :username AND oe.userId = ue.id AND oe.id = :id")
    Optional<OrderEntity> findById(@Param("username") String username, @Param("id") Long id);

}
