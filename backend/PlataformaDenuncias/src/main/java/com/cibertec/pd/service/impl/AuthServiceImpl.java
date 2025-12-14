package com.cibertec.pd.service.impl;

import com.cibertec.pd.dto.AuthLoginRequest;
import com.cibertec.pd.dto.AuthRegisterRequest;
import com.cibertec.pd.exception.BadRequestException;
import com.cibertec.pd.model.TokensRevocados;
import com.cibertec.pd.model.Usuario;
import com.cibertec.pd.repository.UsuarioRepository;
import com.cibertec.pd.repository.TokensRevocadosRepository;
import com.cibertec.pd.service.AuthService;
import com.cibertec.pd.config.JwtUtils;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final UsuarioRepository usuarioRepository;
	private final TokensRevocadosRepository tokenRepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtils jwtUtils;

	@Override
	public String registrar(AuthRegisterRequest req) {

		if (usuarioRepository.existsByEmail(req.getEmail())) {
			throw new BadRequestException("Ya existe un usuario con ese email");
		}

		Usuario usuario = new Usuario();
		usuario.setNombre(req.getNombre());
		usuario.setApellido(req.getApellido());
		usuario.setEmail(req.getEmail());
		usuario.setTelefono(req.getTelefono());
		usuario.setPasswordHash(passwordEncoder.encode(req.getPassword()));

		usuarioRepository.save(usuario);

	    return jwtUtils.generateToken(usuario.getEmail());
	}

	@Override
	public String login(AuthLoginRequest req) {

		Usuario usuario = usuarioRepository.findByEmail(req.getEmail())
				.orElseThrow(() -> new BadRequestException("Credenciales incorrectas o inexistentes"));

		if (!passwordEncoder.matches(req.getPassword(), usuario.getPasswordHash())) {
			throw new BadRequestException("Credenciales incorrectas o inexistentes");
		}

		return jwtUtils.generateToken(usuario.getEmail());
	}

	@Override
	public void logout(String token) {
		TokensRevocados t = new TokensRevocados();
		t.setToken(token);
		tokenRepo.save(t);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

	    Usuario usuario = usuarioRepository.findByEmail(username)
	            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

	    var authorities = usuario.getRoles()
	            .stream()
	            .map(rol -> new SimpleGrantedAuthority("ROLE_" + rol.getNombre()))
	            .toList();

	    return org.springframework.security.core.userdetails.User.builder()
	            .username(usuario.getEmail())
	            .password(usuario.getPasswordHash())
	            .authorities(authorities)
	            .build();
	}


}
