package sn.smd.GestionLivre.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.smd.GestionLivre.entity.Auteur;

public interface AuteurRepository extends JpaRepository<Auteur, Long> {
}
