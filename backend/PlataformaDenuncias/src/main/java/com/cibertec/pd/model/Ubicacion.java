package com.cibertec.pd.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ubicaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ubicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "denuncia_id", unique = true)
    private Denuncia denuncia;

    private Double lat;
    private Double lng;
    private String direccion;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Denuncia getDenuncia() {
		return denuncia;
	}
	public void setDenuncia(Denuncia denuncia) {
		this.denuncia = denuncia;
	}
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
