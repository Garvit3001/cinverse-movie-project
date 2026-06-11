package com.cineverse.auth.controller;

import com.cineverse.auth.dto.ApiResponse;
import com.cineverse.auth.dto.AuthResponse;
import com.cineverse.auth.dto.LoginRequest;
import com.cineverse.auth.dto.RegisterRequest;
import com.cineverse.auth.dto.UserResponse;
import com.cineverse.auth.service.AuthService;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/register")
  public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
    AuthResponse response = authService.register(request);
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(ApiResponse.ok("User registered successfully", HttpStatus.CREATED.value(), response));
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
    return ResponseEntity.ok(ApiResponse.ok("Login successful", HttpStatus.OK.value(), authService.login(request)));
  }

  @GetMapping("/me")
  public ResponseEntity<ApiResponse<UserResponse>> me(Principal principal) {
    return ResponseEntity.ok(ApiResponse.ok("Authenticated user", HttpStatus.OK.value(), authService.currentUser(principal.getName())));
  }

  @GetMapping("/logout")
  public ResponseEntity<ApiResponse<Void>> logout() {
    return ResponseEntity.ok(ApiResponse.ok("Logout successful. Remove the token on the client.", HttpStatus.OK.value(), null));
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<ApiResponse<Map<String, String>>> forgotPassword() {
    return ResponseEntity.ok(ApiResponse.ok(
        "Password reset instructions sent if the account exists",
        HttpStatus.OK.value(),
        Map.of("nextStep", "Connect this endpoint to an email provider before production use")
    ));
  }

  @PostMapping("/reset-password")
  public ResponseEntity<ApiResponse<Map<String, String>>> resetPassword() {
    return ResponseEntity.ok(ApiResponse.ok(
        "Password reset endpoint received the request",
        HttpStatus.OK.value(),
        Map.of("nextStep", "Validate reset tokens before enabling password changes")
    ));
  }

  @GetMapping("/admin/users")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<ApiResponse<Map<String, String>>> adminOnly() {
    return ResponseEntity.ok(ApiResponse.ok("Admin route allowed", HttpStatus.OK.value(), Map.of("access", "ADMIN")));
  }

  @GetMapping("/theatre-owner/dashboard")
  @PreAuthorize("hasAnyRole('THEATRE_OWNER', 'ADMIN')")
  public ResponseEntity<ApiResponse<Map<String, String>>> theatreOwnerOnly() {
    return ResponseEntity.ok(ApiResponse.ok("Theatre owner route allowed", HttpStatus.OK.value(), Map.of("access", "THEATRE_OWNER")));
  }
}
