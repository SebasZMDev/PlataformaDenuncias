package com.cibertec.pd.repository;

import com.cibertec.pd.model.Denuncia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {

    List<Denuncia> findByUsuarioId(Long usuarioId);
    
    long count();
    
    long countByEstado(String estado);

}
