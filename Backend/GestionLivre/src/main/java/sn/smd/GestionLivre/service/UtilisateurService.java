package sn.smd.GestionLivre.service;

import sn.smd.GestionLivre.entity.Auteur;
import sn.smd.GestionLivre.entity.Utilisateur;
import sn.smd.GestionLivre.model.Auteurs;
import sn.smd.GestionLivre.payload.ChangePasswordRequest;
import sn.smd.GestionLivre.payload.ResetPasswordRequest;

import java.util.List;

public interface UtilisateurService {

    Utilisateur createUser(Utilisateur user);
    Utilisateur updateUser(Utilisateur user, Long id);
    void deleteUser(Utilisateur user);
    void deleteUserById(Long id);
    List<Utilisateur> getAllsUser(Boolean actif);
    Utilisateur getUserById(Long id);
    Utilisateur getByUsername(String username);

    Utilisateur activeOuDesactiveCompte(Utilisateur compte);

    boolean changePassword(ChangePasswordRequest request);

    boolean resetPassword(ResetPasswordRequest request);
    boolean reinitialisation(Long compteId);
    Long countUtilisateur();

    Utilisateur activerCompte(Utilisateur compte);
    Auteur createAuteur(Auteurs auteur);

}
