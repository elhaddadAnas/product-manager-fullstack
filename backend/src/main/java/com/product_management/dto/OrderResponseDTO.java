package com.product_management.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponseDTO {
    private Long id;
    private UserResponseDTO user;
    private String username;
    private List<ProductResponseDTO> products;
    private LocalDateTime orderDate;
    private String status;
    private BigDecimal total;
}
