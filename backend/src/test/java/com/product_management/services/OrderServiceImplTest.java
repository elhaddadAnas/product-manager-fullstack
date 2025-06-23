package com.product_management.services;

import com.product_management.dto.OrderRequestDTO;
import com.product_management.dto.OrderResponseDTO;
import com.product_management.entities.Order;
import com.product_management.entities.OrderStatus;
import com.product_management.entities.Product;
import com.product_management.entities.User;
import com.product_management.exceptions.EntityNotFoundException;
import com.product_management.mappers.OrderMapper;
import com.product_management.mappers.ProductMapper;
import com.product_management.mappers.UserMapper;
import com.product_management.repositories.OrderRepository;
import com.product_management.repositories.ProductRepository;
import com.product_management.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OrderServiceImplTest {
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ProductRepository productRepository;
    private OrderMapper orderMapper = new OrderMapper(new UserMapper(), new ProductMapper());
    @InjectMocks
    private OrderServiceImpl orderService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        orderService = new OrderServiceImpl(orderRepository, userRepository, productRepository, orderMapper);
    }

    @Test
    void findAll_returnsListOfDtos() {
        User u = User.builder().id(1L).username("john").build();
        List<Order> orders = List.of(Order.builder().id(1L).user(u).build(), Order.builder().id(2L).user(u).build());
        when(orderRepository.findAll()).thenReturn(orders);

        List<OrderResponseDTO> result = orderService.findAll();

        assertEquals(2, result.size());
        assertEquals(2L, result.get(1).getId());
    }

    @Test
    void findById_returnsDto_whenExists() {
        Order order = Order.builder()
                .id(1L)
                .status(OrderStatus.PENDING)
                .user(User.builder().id(1L).username("john").build())
                .build();
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        OrderResponseDTO dto = orderService.findById(1L);

        assertEquals(1L, dto.getId());
        assertEquals(OrderStatus.PENDING.name(), dto.getStatus());
    }

    @Test
    void findById_throwsException_whenMissing() {
        when(orderRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> orderService.findById(1L));
    }

    @Test
    void save_createsOrderFromRequest() {
        User user = User.builder().id(1L).username("john").build();
        Product product = Product.builder().id(2L).name("p").price(BigDecimal.ONE).build();
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(productRepository.findById(2L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
            Order o = invocation.getArgument(0);
            o.setId(3L);
            return o;
        });

        OrderRequestDTO request = new OrderRequestDTO();
        request.setUserId(1L);
        request.setProductIds(List.of(2L));

        OrderResponseDTO dto = orderService.save(request);

        assertEquals(3L, dto.getId());
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    void delete_callsRepository() {
        orderService.delete(5L);
        verify(orderRepository).deleteById(5L);
    }
}
