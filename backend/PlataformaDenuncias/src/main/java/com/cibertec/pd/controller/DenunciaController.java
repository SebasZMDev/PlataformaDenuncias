package com.cibertec.pd.controller;

import com.cibertec.pd.dto.DenunciaCreateRequest;
import com.cibertec.pd.dto.DenunciaDTO;
import com.cibertec.pd.dto.DenunciaStatsDTO;
import com.cibertec.pd.service.DenunciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/denuncias")
@RequiredArgsConstructor
public class DenunciaController {

    private final DenunciaService denunciaService;

    @PostMapping("/usuario/{usuarioId}")
    public ResponseEntity<DenunciaDTO> crear(@PathVariable Long usuarioId, @RequestBody DenunciaCreateRequest req) {
        return ResponseEntity.ok(denunciaService.crear(req, usuarioId));
    }

    @GetMapping("/stats")
    public ResponseEntity<DenunciaStatsDTO> stats() {
        return ResponseEntity.ok(denunciaService.obtenerStats());
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<DenunciaDTO> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(denunciaService.obtener(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<DenunciaDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(denunciaService.listarPorUsuario(usuarioId));
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Void> actualizarEstado(@PathVariable Long id, @RequestParam String estado) {
        denunciaService.actualizarEstado(id, estado);
        return ResponseEntity.noContent().build();
    }
    
    
}
