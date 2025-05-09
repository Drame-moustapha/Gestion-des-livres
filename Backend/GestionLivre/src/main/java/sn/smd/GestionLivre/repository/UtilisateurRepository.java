package sn.smd.GestionLivre.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.smd.GestionLivre.entity.Utilisateur;

import java.util.Map;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Utilisateur findByUsername(String username);
}
