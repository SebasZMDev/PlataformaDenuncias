package com.cibertec.pd.controller;

import com.cibertec.pd.dto.EvidenciaDTO;
import com.cibertec.pd.service.EvidenciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evidencias")
@RequiredArgsConstructor
public class EvidenciaController {

    private final EvidenciaService evidenciaService;

    @PostMapping("/denuncia/{denunciaId}")
    public ResponseEntity<EvidenciaDTO> guardar(@PathVariable Long denunciaId,
                                                @RequestParam String tipo,
                                                @RequestParam String url) {
        return ResponseEntity.ok(evidenciaService.guardarArchivo(denunciaId, tipo, url));
    }

    @GetMapping("/denuncia/{denunciaId}")
    public ResponseEntity<List<EvidenciaDTO>> listarPorDenuncia(@PathVariable Long denunciaId) {
        return ResponseEntity.ok(evidenciaService.listarPorDenuncia(denunciaId));
    }
}
