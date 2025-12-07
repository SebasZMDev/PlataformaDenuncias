package com.cibertec.pd.controller;

import com.cibertec.pd.dto.AuthLoginRequest;
import com.cibertec.pd.dto.AuthRegisterRequest;
import com.cibertec.pd.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthLoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRegisterRequest request) {
        return ResponseEntity.ok(authService.registrar(request));
    }
}
