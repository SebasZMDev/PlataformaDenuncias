package com.cibertec.pd.service.impl;

import com.cibertec.pd.dto.EvidenciaDTO;
import com.cibertec.pd.exception.ResourceNotFoundException;
import com.cibertec.pd.mapper.EvidenciaMapper;
import com.cibertec.pd.model.Denuncia;
import com.cibertec.pd.model.DenunciaEvidencia;
import com.cibertec.pd.repository.DenunciaEvidenciaRepository;
import com.cibertec.pd.repository.DenunciaRepository;
import com.cibertec.pd.service.EvidenciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EvidenciaServiceImpl implements EvidenciaService {

    private final DenunciaEvidenciaRepository repo;
    private final DenunciaRepository denunciaRepo;
    private final EvidenciaMapper mapper;

    @Override
    public EvidenciaDTO guardarArchivo(Long denunciaId, String tipo, String url) {

        Denuncia denuncia = denunciaRepo.findById(denunciaId)
                .orElseThrow(() -> new ResourceNotFoundException("Denuncia no encontrada"));

        DenunciaEvidencia ev = new DenunciaEvidencia();
        ev.setDenuncia(denuncia);
        ev.setTipo(tipo);
        ev.setUrl(url);

        repo.save(ev);

        return mapper.toDTO(ev);
    }

    @Override
    public List<EvidenciaDTO> listarPorDenuncia(Long id) {
        return repo.findByDenunciaId(id)
                .stream()
                .map(mapper::toDTO)
                .toList();
    }
}
