package sn.smd.GestionLivre.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.smd.GestionLivre.entity.Livre;

import java.util.List;

public interface LivreRepository extends JpaRepository<Livre, Long> {
    List<Livre> findAllByAuteurId(Long id);

}
