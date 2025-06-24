package com.product_management.mappers;

import com.product_management.dto.ProductRequestDTO;
import com.product_management.dto.ProductResponseDTO;
import com.product_management.entities.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
    public ProductResponseDTO toDto(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setCreatedBy(product.getCreatedBy());
        return dto;
    }

    public Product toEntity(ProductRequestDTO dto) {
        return Product.builder()
                .name(dto.getName())
                .price(dto.getPrice())
                .build();
    }

    public void updateEntity(Product product, ProductRequestDTO dto) {
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
    }
}
