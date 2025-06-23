package com.product_management.services;

import com.product_management.dto.UserRequestDTO;
import com.product_management.dto.UserResponseDTO;
import com.product_management.entities.User;
import com.product_management.exceptions.EntityNotFoundException;
import com.product_management.mappers.UserMapper;
import com.product_management.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    private UserMapper userMapper = new UserMapper();
    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserServiceImpl(userRepository, userMapper, passwordEncoder);
    }

    @Test
    void findByUsername_returnsDto_whenUserExists() {
        User user = User.builder().id(1L).username("john").password("pass").build();
        when(userRepository.findByUsername("john")).thenReturn(Optional.of(user));

        UserResponseDTO result = userService.findByUsername("john");

        assertEquals("john", result.getUsername());
        assertEquals(1L, result.getId());
    }

    @Test
    void findByUsername_throwsException_whenUserMissing() {
        when(userRepository.findByUsername("john")).thenReturn(Optional.empty());
        assertThrows(EntityNotFoundException.class, () -> userService.findByUsername("john"));
    }

    @Test
    void findAll_returnsListOfDtos() {
        List<User> users = List.of(User.builder().id(1L).username("john").build(),
                                   User.builder().id(2L).username("jane").build());
        when(userRepository.findAll()).thenReturn(users);

        List<UserResponseDTO> result = userService.findAll();

        assertEquals(2, result.size());
        assertEquals("jane", result.get(1).getUsername());
    }

    @Test
    void save_encodesPasswordAndPersists() {
        UserRequestDTO dto = new UserRequestDTO();
        dto.setUsername("john");
        dto.setPassword("pass");
        dto.setRoles(Set.of("USER"));

        when(passwordEncoder.encode("pass")).thenReturn("enc");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId(5L);
            return u;
        });

        UserResponseDTO result = userService.save(dto);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertEquals("enc", captor.getValue().getPassword());
        assertEquals(5L, result.getId());
        assertEquals("john", result.getUsername());
    }

    @Test
    void delete_callsRepository() {
        userService.delete(10L);
        verify(userRepository).deleteById(10L);
    }
}
