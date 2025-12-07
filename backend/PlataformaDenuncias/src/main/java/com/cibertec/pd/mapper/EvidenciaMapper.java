package com.cibertec.pd.mapper;

import com.cibertec.pd.dto.EvidenciaDTO;
import com.cibertec.pd.model.DenunciaEvidencia;
import org.springframework.stereotype.Component;

@Component
public class EvidenciaMapper {

    public EvidenciaDTO toDTO(DenunciaEvidencia e) {
        EvidenciaDTO dto = new EvidenciaDTO();
        dto.setId(e.getId());
        dto.setDenunciaId(e.getDenuncia().getId());
        dto.setTipo(e.getTipo());
        dto.setUrl(e.getUrl());
        dto.setCreadoEn(e.getCreadoEn());
        return dto;
    }
}
