package com.product_management.services;

import com.product_management.dto.UserRequestDTO;
import com.product_management.dto.UserResponseDTO;

import java.util.List;

public interface UserService {
    UserResponseDTO findByUsername(String username);

    List<UserResponseDTO> findAll();

    UserResponseDTO save(UserRequestDTO dto);

    UserResponseDTO update(Long id, UserRequestDTO dto);

    void delete(Long id);
}
