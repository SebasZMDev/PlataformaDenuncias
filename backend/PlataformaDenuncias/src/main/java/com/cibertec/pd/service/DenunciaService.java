package com.cibertec.pd.service;

import com.cibertec.pd.dto.DenunciaCreateRequest;
import com.cibertec.pd.dto.DenunciaDTO;
import com.cibertec.pd.dto.DenunciaStatsDTO;

import java.util.List;

public interface DenunciaService {

    DenunciaDTO crear(DenunciaCreateRequest request, Long usuarioId);

    DenunciaDTO obtener(Long id);

    List<DenunciaDTO> listarPorUsuario(Long usuarioId);

    void actualizarEstado(Long id, String estado);
    
    DenunciaStatsDTO obtenerStats();
    
    DenunciaStatsDTO obtenerStatsUsuario(String email);
    
    List<DenunciaDTO> listarTodas();

}
