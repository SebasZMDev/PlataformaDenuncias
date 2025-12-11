package com.cibertec.pd.service;

import com.cibertec.pd.dto.UsuarioDTO;
import com.cibertec.pd.model.Usuario;

import java.util.List;

public interface UsuarioService {

    UsuarioDTO obtenerPorId(Long id);
    
    UsuarioDTO obtenerPorEmail(String email);
    
    List<UsuarioDTO> listar();

    Usuario crear(Usuario usuario);

    Usuario actualizar(Long id, Usuario usuario);

    void eliminar(Long id);
}
