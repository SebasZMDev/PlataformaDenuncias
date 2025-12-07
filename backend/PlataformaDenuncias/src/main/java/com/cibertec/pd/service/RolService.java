package com.cibertec.pd.service;

import com.cibertec.pd.model.Rol;

import java.util.List;

public interface RolService {

    Rol crear(String nombre);

    List<Rol> listar();

    Rol obtener(Long id);
}
