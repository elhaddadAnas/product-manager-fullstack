package com.product_management.services;

import com.product_management.dto.OrderRequestDTO;
import com.product_management.dto.OrderResponseDTO;
import com.product_management.entities.Order;
import com.product_management.entities.Product;
import com.product_management.entities.User;
import com.product_management.exceptions.EntityNotFoundException;
import com.product_management.repositories.OrderRepository;
import com.product_management.repositories.ProductRepository;
import com.product_management.repositories.UserRepository;
import com.product_management.mappers.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;

    public List<OrderResponseDTO> findAll() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toDto)
                .toList();
    }

    public OrderResponseDTO findById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        return orderMapper.toDto(order);
    }

    public OrderResponseDTO save(OrderRequestDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        List<Product> products = new ArrayList<>();
        for (Long productId : dto.getProductIds()) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new EntityNotFoundException("Product not found"));
            products.add(product);
        }
        Order order = orderMapper.toEntity(dto, user, products);
        Order saved = orderRepository.save(order);
        return orderMapper.toDto(saved);
    }

    public OrderResponseDTO update(Long id, OrderRequestDTO dto) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        List<Product> products = new ArrayList<>();
        for (Long productId : dto.getProductIds()) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new EntityNotFoundException("Product not found"));
            products.add(product);
        }
        orderMapper.updateEntity(order, dto, user, products);
        Order saved = orderRepository.save(order);
        return orderMapper.toDto(saved);
    }

    public void delete(Long id) {
        orderRepository.deleteById(id);
    }
}
