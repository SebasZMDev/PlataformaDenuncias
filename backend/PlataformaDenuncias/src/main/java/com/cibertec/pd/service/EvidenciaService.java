package com.cibertec.pd.service;

import com.cibertec.pd.dto.EvidenciaDTO;

import java.util.List;

public interface EvidenciaService {

    EvidenciaDTO guardarArchivo(Long denunciaId, String tipo, String url);

    List<EvidenciaDTO> listarPorDenuncia(Long denunciaId);
}
