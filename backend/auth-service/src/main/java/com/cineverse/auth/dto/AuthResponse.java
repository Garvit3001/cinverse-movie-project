package com.cineverse.auth.dto;

public record AuthResponse(String token, UserResponse user) {}
