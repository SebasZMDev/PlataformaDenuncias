package com.cibertec.pd.repository;

import com.cibertec.pd.model.TokensRevocados;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokensRevocadosRepository extends JpaRepository<TokensRevocados, Long> {
}
