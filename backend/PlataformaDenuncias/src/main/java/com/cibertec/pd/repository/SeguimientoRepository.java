package com.cibertec.pd.repository;

import com.cibertec.pd.model.Seguimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeguimientoRepository extends JpaRepository<Seguimiento, Long> {

    List<Seguimiento> findByDenunciaId(Long denunciaId);
}
