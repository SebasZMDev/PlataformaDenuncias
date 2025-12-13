package com.cibertec.pd.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class DenunciaDTO {
    private Long id;
    private String titulo;
    private String descripcion;
    private String categoria;
    private String estado;
    private Boolean anonimo;
    private UsuarioDTO usuario;
    private LocalDateTime creadoEn;
    private UbicacionDTO ubicacion;
    private List<EvidenciaDTO> evidencias;
    
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public Boolean getAnonimo() {
		return anonimo;
	}
	public void setAnonimo(Boolean anonimo) {
		this.anonimo = anonimo;
	}
	public LocalDateTime getCreadoEn() {
		return creadoEn;
	}
	public void setCreadoEn(LocalDateTime creadoEn) {
		this.creadoEn = creadoEn;
	}
	public UbicacionDTO getUbicacion() {
		return ubicacion;
	}
	public void setUbicacion(UbicacionDTO ubicacion) {
		this.ubicacion = ubicacion;
	}
	public List<EvidenciaDTO> getEvidencias() {
		return evidencias;
	}
	public void setEvidencias(List<EvidenciaDTO> evidencias) {
		this.evidencias = evidencias;
	}
	
	public void setUsuario(UsuarioDTO usuario) {
		this.usuario = usuario;
	}
    
    
}
