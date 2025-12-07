package com.cibertec.pd.service.impl;

import com.cibertec.pd.dto.SeguimientoRequest;
import com.cibertec.pd.dto.SeguimientoDTO;
import com.cibertec.pd.exception.ResourceNotFoundException;
import com.cibertec.pd.mapper.SeguimientoMapper;
import com.cibertec.pd.model.Denuncia;
import com.cibertec.pd.model.Seguimiento;
import com.cibertec.pd.model.Usuario;
import com.cibertec.pd.repository.DenunciaRepository;
import com.cibertec.pd.repository.SeguimientoRepository;
import com.cibertec.pd.repository.UsuarioRepository;
import com.cibertec.pd.service.SeguimientoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeguimientoServiceImpl implements SeguimientoService {

    private final SeguimientoRepository repo;
    private final DenunciaRepository denunciaRepo;
    private final UsuarioRepository usuarioRepo;
    private final SeguimientoMapper mapper;

    @Override
    public SeguimientoDTO agregar(Long denunciaId, Long usuarioId, SeguimientoRequest req) {

        Denuncia denuncia = denunciaRepo.findById(denunciaId)
                .orElseThrow(() -> new ResourceNotFoundException("Denuncia no encontrada"));

        Usuario usuario = usuarioRepo.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Seguimiento seg = new Seguimiento();
        seg.setDenuncia(denuncia);
        seg.setUsuario(usuario);
        seg.setMensaje(req.getMensaje());
        seg.setEstado(req.getEstado());

        repo.save(seg);

        return mapper.toDTO(seg);
    }

    @Override
    public List<SeguimientoDTO> listarPorDenuncia(Long denunciaId) {
        return repo.findByDenunciaId(denunciaId)
                .stream()
                .map(mapper::toDTO)
                .toList();
    }
}
