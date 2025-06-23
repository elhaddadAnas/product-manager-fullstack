package com.product_management.controllers;

import com.product_management.dto.AuthResponseDTO;
import com.product_management.dto.LoginRequestDTO;
import com.product_management.exceptions.UnauthorizedAccessException;
import com.product_management.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.product_management.config.Path;

@RestController
@RequestMapping(Path.AUTH)
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping(Path.LOGIN)
    public AuthResponseDTO login(@RequestBody LoginRequestDTO request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            String token = jwtService.generateToken((UserDetails) authentication.getPrincipal());
            return new AuthResponseDTO(token);
        } catch (AuthenticationException ex) {
            throw new UnauthorizedAccessException("Invalid credentials");
        }
    }
}
