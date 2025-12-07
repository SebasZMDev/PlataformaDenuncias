package com.cibertec.pd.service;

import com.cibertec.pd.dto.SeguimientoRequest;
import com.cibertec.pd.dto.SeguimientoDTO;

import java.util.List;

public interface SeguimientoService {

    SeguimientoDTO agregar(Long denunciaId, Long usuarioId, SeguimientoRequest req);

    List<SeguimientoDTO> listarPorDenuncia(Long denunciaId);
}
