package com.cibertec.pd.controller;

import com.cibertec.pd.dto.SeguimientoDTO;
import com.cibertec.pd.dto.SeguimientoRequest;
import com.cibertec.pd.service.SeguimientoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seguimientos")
@RequiredArgsConstructor
public class SeguimientoController {

    private final SeguimientoService seguimientoService;

    @PostMapping("/denuncia/{denunciaId}/usuario/{usuarioId}")
    public ResponseEntity<SeguimientoDTO> agregar(@PathVariable Long denunciaId,
                                                  @PathVariable Long usuarioId,
                                                  @RequestBody SeguimientoRequest req) {
        return ResponseEntity.ok(seguimientoService.agregar(denunciaId, usuarioId, req));
    }

    @GetMapping("/denuncia/{denunciaId}")
    public ResponseEntity<List<SeguimientoDTO>> listarPorDenuncia(@PathVariable Long denunciaId) {
        return ResponseEntity.ok(seguimientoService.listarPorDenuncia(denunciaId));
    }
}
