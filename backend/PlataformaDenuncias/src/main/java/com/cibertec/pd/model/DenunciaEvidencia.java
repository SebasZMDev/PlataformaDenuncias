package com.cibertec.pd.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "denuncia_evidencias")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DenunciaEvidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "denuncia_id")
    private Denuncia denuncia;

    private String tipo;
    private String url;

    @Column(name = "creado_en")
    private LocalDateTime creadoEn = LocalDateTime.now();

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
