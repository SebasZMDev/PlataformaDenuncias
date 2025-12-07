package com.cibertec.pd.dto;

import lombok.Data;

@Data
public class DenunciaCreateRequest {
    private String titulo;
    private String descripcion;
    private String categoria;
    private Boolean anonimo;
    private UbicacionDTO ubicacion;
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
	public Boolean getAnonimo() {
		return anonimo;
	}
	public void setAnonimo(Boolean anonimo) {
		this.anonimo = anonimo;
	}
	public UbicacionDTO getUbicacion() {
		return ubicacion;
	}
	public void setUbicacion(UbicacionDTO ubicacion) {
		this.ubicacion = ubicacion;
	}
    
    
    
}
