package com.product_management.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Set;

@Data
public class UserRequestDTO {
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private Set<String> roles;
}
