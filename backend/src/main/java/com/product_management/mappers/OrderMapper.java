package com.product_management.mappers;

import com.product_management.dto.OrderRequestDTO;
import com.product_management.dto.OrderResponseDTO;
import com.product_management.entities.Order;
import com.product_management.entities.OrderStatus;
import com.product_management.entities.Product;
import com.product_management.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OrderMapper {
    private final UserMapper userMapper;
    private final ProductMapper productMapper;

    public OrderResponseDTO toDto(Order order) {
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setId(order.getId());
        dto.setUser(userMapper.toDto(order.getUser()));
        dto.setUsername(order.getUser().getUsername());
        dto.setProducts(order.getProducts().stream().map(productMapper::toDto).toList());
        dto.setOrderDate(order.getOrderDate());
        dto.setStatus(order.getStatus().name());
        dto.setTotal(order.getTotal());
        return dto;
    }

    public Order toEntity(OrderRequestDTO dto, User user, List<Product> products) {
        OrderStatus status = OrderStatus.PENDING;
        if (dto.getStatus() != null) {
            status = OrderStatus.valueOf(dto.getStatus());
        }
        return Order.builder()
                .user(user)
                .products(products)
                .status(status)
                .build();
    }

    public void updateEntity(Order order, OrderRequestDTO dto, User user, List<Product> products) {
        order.setUser(user);
        order.setProducts(products);
        if (dto.getStatus() != null) {
            order.setStatus(OrderStatus.valueOf(dto.getStatus()));
        }
        order.setTotal(products.stream()
                .map(Product::getPrice)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add));
    }
}
