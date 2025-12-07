package com.cibertec.pd.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "tokens_revocados")
@Data
public class TokensRevocados {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String token;

    @Column(name = "revocado_en")
    private LocalDateTime revocadoEn = LocalDateTime.now();

    public TokensRevocados() {}

    public TokensRevocados(String token) {
        this.token = token;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public LocalDateTime getRevocadoEn() {
		return revocadoEn;
	}

	public void setRevocadoEn(LocalDateTime revocadoEn) {
		this.revocadoEn = revocadoEn;
	}
    
    
}
