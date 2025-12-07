package com.cibertec.pd.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EvidenciaDTO {

    private Long id;
    private Long denunciaId;
    private String tipo;
    private String url;
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
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public LocalDateTime getCreadoEn() {
		return creadoEn;
	}
	public void setCreadoEn(LocalDateTime creadoEn) {
		this.creadoEn = creadoEn;
	}
    
    
    
}
