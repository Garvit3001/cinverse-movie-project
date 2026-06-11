package com.cineverse.auth.exception;

import com.cineverse.auth.dto.ApiResponse;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(ApiException.class)
  ResponseEntity<ApiResponse<Void>> handleApiException(ApiException exception) {
    return ResponseEntity
        .status(exception.getStatus())
        .body(ApiResponse.error(exception.getMessage(), exception.getStatus().value(), null));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  ResponseEntity<ApiResponse<Map<String, String>>> handleValidation(MethodArgumentNotValidException exception) {
    Map<String, String> errors = new LinkedHashMap<>();
    exception.getBindingResult().getFieldErrors().forEach(
        error -> errors.put(error.getField(), error.getDefaultMessage())
    );
    return ResponseEntity
        .badRequest()
        .body(ApiResponse.error("Validation failed", HttpStatus.BAD_REQUEST.value(), errors));
  }

  @ExceptionHandler({BadCredentialsException.class})
  ResponseEntity<ApiResponse<Void>> handleBadCredentials() {
    return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(ApiResponse.error("Invalid credentials", HttpStatus.UNAUTHORIZED.value(), null));
  }

  @ExceptionHandler(AccessDeniedException.class)
  ResponseEntity<ApiResponse<Void>> handleAccessDenied() {
    return ResponseEntity
        .status(HttpStatus.FORBIDDEN)
        .body(ApiResponse.error("You do not have permission to access this resource", HttpStatus.FORBIDDEN.value(), null));
  }

  @ExceptionHandler(Exception.class)
  ResponseEntity<ApiResponse<Void>> handleUnexpected(Exception exception) {
    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(ApiResponse.error("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
  }
}
