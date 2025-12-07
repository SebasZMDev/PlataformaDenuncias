package com.cibertec.pd.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SeguimientoDTO {

    private Long id;
    private Long denunciaId;
    private Long usuarioId;
    private String usuarioNombre;
    private String mensaje;
    private String estado;
    private LocalDateTime creadoEn;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getDenunciaId() {
		return denunciaId;
	}
	public void setDenunciaId(Long denunciaId) {
		this.denunciaId = denunciaId;
	}
	public Long getUsuarioId() {
		return usuarioId;
	}
	public void setUsuarioId(Long usuarioId) {
		this.usuarioId = usuarioId;
	}
	public String getUsuarioNombre() {
		return usuarioNombre;
	}
	public void setUsuarioNombre(String usuarioNombre) {
		this.usuarioNombre = usuarioNombre;
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
	public LocalDateTime getCreadoEn() {
		return creadoEn;
	}
	public void setCreadoEn(LocalDateTime creadoEn) {
		this.creadoEn = creadoEn;
	}
    
    
}
