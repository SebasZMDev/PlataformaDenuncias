package com.cibertec.pd.mapper;

import com.cibertec.pd.model.Usuario;

import com.cibertec.pd.dto.UsuarioDTO;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
@Component
public class UsuarioMapper {

    public UsuarioDTO toDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setApellido(usuario.getApellido());
        dto.setEmail(usuario.getEmail());
        dto.setTelefono(usuario.getTelefono());
        dto.setRoles(usuario.getRoles()
                     .stream()
                     .map(r -> r.getNombre())
                     .collect(Collectors.toSet()));
        return dto;
    }
}
