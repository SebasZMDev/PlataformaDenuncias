package com.cibertec.pd.mapper;

import com.cibertec.pd.model.Seguimiento;
import com.cibertec.pd.dto.SeguimientoRequest;
import com.cibertec.pd.dto.SeguimientoDTO;
import org.springframework.stereotype.Component;

@Component
public class SeguimientoMapper {

    public Seguimiento toEntity(SeguimientoRequest request) {
        Seguimiento s = new Seguimiento();
        s.setMensaje(request.getMensaje());
        s.setEstado(request.getEstado());
        return s;
    }

    public SeguimientoDTO toDTO(Seguimiento s) {
        SeguimientoDTO dto = new SeguimientoDTO();
        dto.setId(s.getId());
        dto.setMensaje(s.getMensaje());
        dto.setEstado(s.getEstado());
        dto.setUsuarioId(s.getUsuario().getId());
        dto.setDenunciaId(s.getDenuncia().getId());
        dto.setCreadoEn(s.getCreadoEn());
        return dto;
    }
}
