package sn.smd.GestionLivre.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.smd.GestionLivre.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
