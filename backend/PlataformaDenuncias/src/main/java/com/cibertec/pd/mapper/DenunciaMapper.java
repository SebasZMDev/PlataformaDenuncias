package com.cibertec.pd.mapper;

import com.cibertec.pd.dto.DenunciaCreateRequest;
import com.cibertec.pd.dto.DenunciaDTO;
import com.cibertec.pd.dto.UbicacionDTO;
import com.cibertec.pd.dto.UsuarioDTO;
import com.cibertec.pd.dto.EvidenciaDTO;
import com.cibertec.pd.model.Denuncia;
import com.cibertec.pd.model.Ubicacion;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class DenunciaMapper {

    public DenunciaDTO toDTO(Denuncia denuncia) {
        DenunciaDTO dto = new DenunciaDTO();
        dto.setId(denuncia.getId());
        dto.setTitulo(denuncia.getTitulo());
        dto.setDescripcion(denuncia.getDescripcion());
        dto.setCategoria(denuncia.getCategoria());
        dto.setEstado(denuncia.getEstado());
        dto.setAnonimo(denuncia.getAnonimo());
        dto.setCreadoEn(denuncia.getCreadoEn());


        if (!denuncia.getAnonimo() && denuncia.getUsuario() != null) {
            UsuarioDTO u = new UsuarioDTO();
            u.setId(denuncia.getUsuario().getId());
            u.setNombre(denuncia.getUsuario().getNombre());
            u.setApellido(denuncia.getUsuario().getApellido());
            dto.setUsuario(u);
        }
        
        if (denuncia.getUbicacion() != null) {
            UbicacionDTO u = new UbicacionDTO();
            u.setLat(denuncia.getUbicacion().getLat());
            u.setLng(denuncia.getUbicacion().getLng());
            u.setDireccion(denuncia.getUbicacion().getDireccion());
            dto.setUbicacion(u);
        }

        dto.setEvidencias(
            denuncia.getEvidencias()
                    .stream()
                    .map(e -> {
                        EvidenciaDTO ed = new EvidenciaDTO();
                        ed.setTipo(e.getTipo());
                        ed.setUrl(e.getUrl());
                        return ed;
                    }).collect(Collectors.toList())
        );

        return dto;
    }

    public Denuncia toEntity(DenunciaCreateRequest request) {
        Denuncia d = new Denuncia();
        d.setTitulo(request.getTitulo());
        d.setDescripcion(request.getDescripcion());
        d.setCategoria(request.getCategoria());
        d.setAnonimo(request.getAnonimo());

        if (request.getUbicacion() != null) {

            UbicacionDTO loc = request.getUbicacion();

            Ubicacion u = new Ubicacion();
            u.setLat(loc.getLat());
            u.setLng(loc.getLng());
            u.setDireccion(loc.getDireccion());

            d.setUbicacion(u);
        }

        return d;
    }

}
