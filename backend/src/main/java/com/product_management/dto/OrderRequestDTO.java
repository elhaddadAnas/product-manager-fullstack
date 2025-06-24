package com.product_management.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequestDTO {
    @NotNull
    private Long userId;

    @NotEmpty
    private List<Long> productIds;

    private String status;
}
