package com.product_management.services;

import com.product_management.dto.ProductRequestDTO;
import com.product_management.dto.ProductResponseDTO;
import com.product_management.entities.Product;
import com.product_management.exceptions.EntityNotFoundException;
import com.product_management.mappers.ProductMapper;
import com.product_management.repositories.ProductRepository;
import com.product_management.repositories.OrderRepository;
import com.product_management.exceptions.ProductDeletionException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceImplTest {
    @Mock
    private ProductRepository productRepository;
    @Mock
    private OrderRepository orderRepository;
    private ProductMapper productMapper = new ProductMapper();
    @InjectMocks
    private ProductServiceImpl productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        productService = new ProductServiceImpl(productRepository, orderRepository, productMapper);
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(new UsernamePasswordAuthenticationToken("tester", "pass"));
        SecurityContextHolder.setContext(context);
    }

    @Test
    void findAll_returnsListOfDtos() {
        List<Product> products = List.of(
                Product.builder().id(1L).name("a").price(BigDecimal.ONE).build(),
                Product.builder().id(2L).name("b").price(BigDecimal.TEN).build()
        );
        when(productRepository.findAll()).thenReturn(products);

        List<ProductResponseDTO> result = productService.findAll();

        assertEquals(2, result.size());
        assertEquals("b", result.get(1).getName());
    }

    @Test
    void findById_returnsDto_whenExists() {
        Product product = Product.builder().id(1L).name("a").price(BigDecimal.ONE).build();
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        ProductResponseDTO result = productService.findById(1L);

        assertEquals("a", result.getName());
    }

    @Test
    void findById_throwsException_whenMissing() {
        when(productRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> productService.findById(1L));
    }

    @Test
    void save_persistsAndReturnsDto() {
        ProductRequestDTO dto = new ProductRequestDTO();
        dto.setName("a");
        dto.setPrice(BigDecimal.ONE);
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> {
            Product p = invocation.getArgument(0);
            p.setId(3L);
            return p;
        });

        ProductResponseDTO result = productService.save(dto);

        assertEquals(3L, result.getId());
        assertEquals("tester", result.getCreatedBy());
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void delete_callsRepository() {
        Product product = Product.builder().id(5L).name("a").price(BigDecimal.ONE).build();
        when(productRepository.findById(5L)).thenReturn(Optional.of(product));
        when(orderRepository.existsByProducts_Id(5L)).thenReturn(false);

        productService.delete(5L);

        verify(productRepository).delete(product);
    }

    @Test
    void delete_throwsException_whenProductInOrder() {
        Product product = Product.builder().id(6L).name("b").price(BigDecimal.TEN).build();
        when(productRepository.findById(6L)).thenReturn(Optional.of(product));
        when(orderRepository.existsByProducts_Id(6L)).thenReturn(true);

        assertThrows(ProductDeletionException.class, () -> productService.delete(6L));
        verify(productRepository, never()).delete(any());
    }
}
