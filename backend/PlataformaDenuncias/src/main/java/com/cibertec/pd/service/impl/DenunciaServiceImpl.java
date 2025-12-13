package com.cibertec.pd.service.impl;

import com.cibertec.pd.dto.DenunciaCreateRequest;
import com.cibertec.pd.dto.DenunciaDTO;
import com.cibertec.pd.dto.DenunciaStatsDTO;
import com.cibertec.pd.exception.ResourceNotFoundException;
import com.cibertec.pd.mapper.DenunciaMapper;
import com.cibertec.pd.model.Denuncia;
import com.cibertec.pd.model.Ubicacion;
import com.cibertec.pd.model.Usuario;
import com.cibertec.pd.repository.DenunciaRepository;
import com.cibertec.pd.repository.UbicacionRepository;
import com.cibertec.pd.repository.UsuarioRepository;
import com.cibertec.pd.service.DenunciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DenunciaServiceImpl implements DenunciaService {

    private final DenunciaRepository denunciaRepo;
    private final UsuarioRepository usuarioRepo;
    private final UbicacionRepository ubicacionRepository;
    private final DenunciaMapper mapper;

    @Override
    public DenunciaDTO crear(DenunciaCreateRequest req, Long usuarioId) {
        Usuario usuario = usuarioRepo.findById(usuarioId)
                .orElse(null);

        Denuncia denuncia = mapper.toEntity(req);
        denuncia.setUsuario(usuario);

        denunciaRepo.save(denuncia);

        if (req.getUbicacion() != null) {
            Ubicacion ubicacion = new Ubicacion();
            ubicacion.setDenuncia(denuncia);
            ubicacion.setLat(req.getUbicacion().getLat());
            ubicacion.setLng(req.getUbicacion().getLng());
            ubicacion.setDireccion(req.getUbicacion().getDireccion());
            ubicacionRepository.save(ubicacion);
            denuncia.setUbicacion(ubicacion);
        }

        return mapper.toDTO(denuncia);
    }
    @Override
    public DenunciaDTO obtener(Long id) {
        return mapper.toDTO(
                denunciaRepo.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Denuncia no encontrada"))
        );
    }

    @Override
    public List<DenunciaDTO> listarPorUsuario(Long usuarioId) {
        return denunciaRepo.findByUsuarioId(usuarioId)
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    @Override
    public void actualizarEstado(Long id, String estado) {
        Denuncia denuncia = denunciaRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Denuncia no encontrada"));
        denuncia.setEstado(estado);
        denunciaRepo.save(denuncia);
    }

    @Override
    public DenunciaStatsDTO obtenerStats() {

        long total = denunciaRepo.count();
        long pendientes = denunciaRepo.countByEstado("pendiente");
        long enProceso = denunciaRepo.countByEstado("en_progreso");
        long finalizadas = denunciaRepo.countByEstado("finalizada");

        DenunciaStatsDTO dto = new DenunciaStatsDTO();
        dto.setTotal(total);
        dto.setPendientes(pendientes);
        dto.setEnProceso(enProceso);
        dto.setResueltas(finalizadas);

        return dto;
    }

}
