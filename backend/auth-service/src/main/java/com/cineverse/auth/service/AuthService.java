package com.cineverse.auth.service;

import com.cineverse.auth.dto.AuthResponse;
import com.cineverse.auth.dto.LoginRequest;
import com.cineverse.auth.dto.RegisterRequest;
import com.cineverse.auth.dto.UserResponse;
import com.cineverse.auth.entity.Role;
import com.cineverse.auth.entity.User;
import com.cineverse.auth.exception.ApiException;
import com.cineverse.auth.repository.UserRepository;
import com.cineverse.auth.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthService(
      UserRepository userRepository,
      PasswordEncoder passwordEncoder,
      JwtService jwtService,
      AuthenticationManager authenticationManager
  ) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
  }

  @Transactional
  public AuthResponse register(RegisterRequest request) {
    String email = request.email().trim().toLowerCase();
    if (userRepository.existsByEmailIgnoreCase(email)) {
      throw new ApiException(HttpStatus.CONFLICT, "Email is already registered");
    }

    User user = new User();
    user.setName(request.name().trim());
    user.setEmail(email);
    user.setPassword(passwordEncoder.encode(request.password()));
    user.setRole(request.role() == null ? Role.USER : request.role());

    User savedUser = userRepository.save(user);
    return new AuthResponse(jwtService.generateToken(savedUser), UserResponse.from(savedUser));
  }

  public AuthResponse login(LoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.email(), request.password())
    );

    User user = userRepository.findByEmailIgnoreCase(request.email())
        .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
    return new AuthResponse(jwtService.generateToken(user), UserResponse.from(user));
  }

  public UserResponse currentUser(String email) {
    User user = userRepository.findByEmailIgnoreCase(email)
        .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));
    return UserResponse.from(user);
  }
}
