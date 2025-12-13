package com.cibertec.pd.controller;

import com.cibertec.pd.dto.AuthLoginRequest;
import com.cibertec.pd.dto.AuthRegisterRequest;
import com.cibertec.pd.service.AuthService;

import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthLoginRequest request, HttpServletResponse response) {
        String token = authService.login(request);


        boolean isDev = true;

        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(!isDev)    
                .sameSite("Lax")
                .path("/")
                .domain("localhost")
                .maxAge(60L * 60 * 24 * 7)
                .build();


        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(Map.of("ok", true));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRegisterRequest request, HttpServletResponse response) {
        String token = authService.registrar(request);

        boolean isDev = true;

        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(!isDev)    
                .sameSite("Lax")
                .path("/")
                .domain("localhost")
                .maxAge(60L * 60 * 24 * 7)
                .build();


        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(Map.of("ok", true));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
        return ResponseEntity.ok(Map.of("ok", true));
    }
}
