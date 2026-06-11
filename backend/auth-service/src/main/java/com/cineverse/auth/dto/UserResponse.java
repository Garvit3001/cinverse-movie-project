package com.cineverse.auth.dto;

import com.cineverse.auth.entity.Role;
import com.cineverse.auth.entity.User;
import java.time.Instant;

public record UserResponse(Long id, String name, String email, Role role, Instant createdAt) {
  public static UserResponse from(User user) {
    return new UserResponse(
        user.getId(),
        user.getName(),
        user.getEmail(),
        user.getRole(),
        user.getCreatedAt()
    );
  }
}
