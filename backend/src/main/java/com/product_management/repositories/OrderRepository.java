package com.product_management.repositories;

import com.product_management.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    boolean existsByProducts_Id(Long productId);
}
