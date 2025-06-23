package com.product_management.services;

import com.product_management.dto.ProductRequestDTO;
import com.product_management.dto.ProductResponseDTO;
import com.product_management.entities.Product;
import com.product_management.exceptions.EntityNotFoundException;
import com.product_management.exceptions.ProductDeletionException;
import com.product_management.repositories.ProductRepository;
import com.product_management.repositories.OrderRepository;
import com.product_management.mappers.ProductMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final ProductMapper productMapper;

    public List<ProductResponseDTO> findAll() {
        return productRepository.findAll().stream()
                .map(productMapper::toDto)
                .toList();
    }

    public ProductResponseDTO findById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        return productMapper.toDto(product);
    }

    public ProductResponseDTO save(ProductRequestDTO dto) {
        Product product = productMapper.toEntity(dto);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        product.setCreatedBy(username);
        Product saved = productRepository.save(product);
        return productMapper.toDto(saved);
    }

    public ProductResponseDTO update(Long id, ProductRequestDTO dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        productMapper.updateEntity(product, dto);
        Product saved = productRepository.save(product);
        return productMapper.toDto(saved);
    }

    public void delete(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        if (orderRepository.existsByProducts_Id(id)) {
            throw new ProductDeletionException("Cannot delete product associated with existing orders");
        }
        productRepository.delete(product);
    }
}
