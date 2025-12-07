package com.cibertec.pd.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.cibertec.pd.dto.AuthLoginRequest;
import com.cibertec.pd.dto.AuthRegisterRequest;

public interface AuthService extends UserDetailsService {

    String registrar(AuthRegisterRequest request);

    String login(AuthLoginRequest request);

    void logout(String token);
}

