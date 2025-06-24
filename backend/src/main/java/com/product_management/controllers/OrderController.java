package com.product_management.controllers;

import com.product_management.dto.OrderRequestDTO;
import com.product_management.dto.OrderResponseDTO;
import com.product_management.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.product_management.config.Path;

import java.util.List;

@RestController
@RequestMapping(Path.ORDERS)
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public List<OrderResponseDTO> findAll() {
        return orderService.findAll();
    }

    @GetMapping("/{id}")
    public OrderResponseDTO findById(@PathVariable Long id) {
        return orderService.findById(id);
    }

    @PostMapping
    public OrderResponseDTO create(@Valid @RequestBody OrderRequestDTO dto) {
        return orderService.save(dto);
    }

    @PutMapping("/{id}")
    public OrderResponseDTO update(@PathVariable Long id, @Valid @RequestBody OrderRequestDTO dto) {
        return orderService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        orderService.delete(id);
    }
}
