package com.acme.todo.integration;

import com.acme.todo.dto.request.LoginRequest;
import com.acme.todo.dto.request.RegisterRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class AuthControllerIntegrationTest extends AbstractIntegrationTest {

    @Test
    @DisplayName("Should register new user successfully")
    void shouldRegisterNewUser() throws Exception {
        RegisterRequest request = RegisterRequest.builder()
                .username("testuser")
                .email("testuser@example.com")
                .password("testpassword123")
                .firstName("Test")
                .lastName("User")
                .build();

        mockMvc.perform(post(getBaseUrl() + "/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accessToken").isNotEmpty())
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.user.username").value("testuser"))
                .andExpect(jsonPath("$.user.email").value("testuser@example.com"));
    }

    @Test
    @DisplayName("Should login successfully with valid credentials")
    void shouldLoginSuccessfully() throws Exception {
        // First register a user
        RegisterRequest registerRequest = RegisterRequest.builder()
                .username("logintest")
                .email("logintest@example.com")
                .password("password123")
                .build();

        mockMvc.perform(post(getBaseUrl() + "/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(registerRequest)))
                .andExpect(status().isCreated());

        // Then try to login
        LoginRequest loginRequest = new LoginRequest("logintest", "password123");

        mockMvc.perform(post(getBaseUrl() + "/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").isNotEmpty())
                .andExpect(jsonPath("$.user.username").value("logintest"));
    }

    @Test
    @DisplayName("Should return 401 for invalid credentials")
    void shouldReturn401ForInvalidCredentials() throws Exception {
        LoginRequest request = new LoginRequest("nonexistent", "wrongpassword");

        mockMvc.perform(post(getBaseUrl() + "/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Should return 400 for duplicate username")
    void shouldReturn400ForDuplicateUsername() throws Exception {
        RegisterRequest request1 = RegisterRequest.builder()
                .username("duplicate")
                .email("first@example.com")
                .password("password123")
                .build();

        mockMvc.perform(post(getBaseUrl() + "/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(request1)))
                .andExpect(status().isCreated());

        RegisterRequest request2 = RegisterRequest.builder()
                .username("duplicate")
                .email("second@example.com")
                .password("password123")
                .build();

        mockMvc.perform(post(getBaseUrl() + "/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(request2)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value(containsString("Username")));
    }

    @Test
    @DisplayName("Should get current user with valid token")
    void shouldGetCurrentUser() throws Exception {
        // Register a user first
        RegisterRequest registerRequest = RegisterRequest.builder()
                .username("metest")
                .email("metest@example.com")
                .password("password123")
                .firstName("Me")
                .lastName("Test")
                .build();

        mockMvc.perform(post(getBaseUrl() + "/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(registerRequest)))
                .andExpect(status().isCreated());

        String token = authenticateAndGetToken("metest", "password123");

        mockMvc.perform(get(getBaseUrl() + "/auth/me")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("metest"))
                .andExpect(jsonPath("$.email").value("metest@example.com"))
                .andExpect(jsonPath("$.firstName").value("Me"));
    }

    @Test
    @DisplayName("Should return 401 for /me without token")
    void shouldReturn401ForMeWithoutToken() throws Exception {
        mockMvc.perform(get(getBaseUrl() + "/auth/me"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Should return 400 for invalid registration data")
    void shouldReturn400ForInvalidRegistrationData() throws Exception {
        RegisterRequest request = RegisterRequest.builder()
                .username("ab")  // Too short
                .email("invalid-email")  // Invalid format
                .password("123")  // Too short
                .build();

        mockMvc.perform(post(getBaseUrl() + "/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJson(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors").isArray())
                .andExpect(jsonPath("$.fieldErrors", hasSize(greaterThanOrEqualTo(2))));
    }
}
