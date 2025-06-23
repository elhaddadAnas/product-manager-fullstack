package com.product_management.dto;

import lombok.Data;

import java.util.Set;

@Data
public class UserResponseDTO {
    private Long id;
    private String username;
    private Set<String> roles;
}
