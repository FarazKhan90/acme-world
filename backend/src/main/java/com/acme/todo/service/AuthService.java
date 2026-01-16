package com.acme.todo.service;

import com.acme.todo.dto.request.LoginRequest;
import com.acme.todo.dto.request.RegisterRequest;
import com.acme.todo.dto.response.AuthResponse;
import com.acme.todo.dto.response.UserResponse;
import com.acme.todo.entity.User;
import com.acme.todo.exception.BadRequestException;
import com.acme.todo.repository.UserRepository;
import com.acme.todo.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String token = jwtTokenProvider.generateToken(authentication);
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadRequestException("User not found"));

        return AuthResponse.of(
                token,
                jwtTokenProvider.getExpirationMs() / 1000,
                UserResponse.fromEntity(user)
        );
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username is already taken");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already in use");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .enabled(true)
                .build();

        user = userRepository.save(user);

        String token = jwtTokenProvider.generateToken(request.getUsername());

        return AuthResponse.of(
                token,
                jwtTokenProvider.getExpirationMs() / 1000,
                UserResponse.fromEntity(user)
        );
    }

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadRequestException("User not found"));
        return UserResponse.fromEntity(user);
    }
}
