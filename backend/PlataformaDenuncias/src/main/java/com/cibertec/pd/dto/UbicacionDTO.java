package com.cibertec.pd.dto;

import lombok.Data;

@Data
public class UbicacionDTO {
    private Double lat;
    private Double lng;
    private String direccion;
	public Double getLat() {
		return lat;
	}
	public void setLat(Double lat) {
		this.lat = lat;
	}
	public Double getLng() {
		return lng;
	}
	public void setLng(Double lng) {
		this.lng = lng;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
    
    
    
}
