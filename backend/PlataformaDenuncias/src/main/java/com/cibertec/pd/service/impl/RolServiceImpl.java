package com.cibertec.pd.service.impl;

import com.cibertec.pd.exception.ResourceNotFoundException;
import com.cibertec.pd.model.Rol;
import com.cibertec.pd.repository.RolRepository;
import com.cibertec.pd.service.RolService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RolServiceImpl implements RolService {

    private final RolRepository repo;

    @Override
    public Rol crear(String nombre) {
        Rol rol = new Rol();
        rol.setNombre(nombre);
        return repo.save(rol);
    }

    @Override
    public List<Rol> listar() {
        return repo.findAll();
    }

    @Override
    public Rol obtener(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado"));
    }

}
