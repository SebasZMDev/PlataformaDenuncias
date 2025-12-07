package com.cibertec.pd.repository;

import com.cibertec.pd.model.DenunciaEvidencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DenunciaEvidenciaRepository extends JpaRepository<DenunciaEvidencia, Long> {

    List<DenunciaEvidencia> findByDenunciaId(Long denunciaId);
}
