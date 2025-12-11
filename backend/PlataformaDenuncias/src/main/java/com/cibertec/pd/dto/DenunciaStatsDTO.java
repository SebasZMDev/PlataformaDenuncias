package com.cibertec.pd.dto;

import lombok.Data;

@Data
public class DenunciaStatsDTO {
    private long total;
    private long pendientes;
    private long enProceso;
    private long resueltas;
}
