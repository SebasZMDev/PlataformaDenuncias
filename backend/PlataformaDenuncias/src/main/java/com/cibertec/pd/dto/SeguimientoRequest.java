package com.cibertec.pd.dto;

import lombok.Data;

@Data
public class SeguimientoRequest {
    private Long denunciaId;
    private String mensaje;
    private String estado;
	public Long getDenunciaId() {
		return denunciaId;
	}
	public void setDenunciaId(Long denunciaId) {
		this.denunciaId = denunciaId;
	}
	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
    
    
}
