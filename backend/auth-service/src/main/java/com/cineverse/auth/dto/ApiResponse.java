package com.cineverse.auth.dto;

import java.time.Instant;

public record ApiResponse<T>(boolean success, String message, int status, T data, Instant timestamp) {
  public static <T> ApiResponse<T> ok(String message, int status, T data) {
    return new ApiResponse<>(true, message, status, data, Instant.now());
  }

  public static <T> ApiResponse<T> error(String message, int status, T data) {
    return new ApiResponse<>(false, message, status, data, Instant.now());
  }
}
