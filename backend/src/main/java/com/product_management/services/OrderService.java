package com.product_management.services;

import com.product_management.dto.OrderRequestDTO;
import com.product_management.dto.OrderResponseDTO;

import java.util.List;

public interface OrderService {
    List<OrderResponseDTO> findAll();

    OrderResponseDTO findById(Long id);

    OrderResponseDTO save(OrderRequestDTO dto);

    OrderResponseDTO update(Long id, OrderRequestDTO dto);

    void delete(Long id);
}
