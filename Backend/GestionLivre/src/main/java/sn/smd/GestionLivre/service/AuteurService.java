package sn.smd.GestionLivre.service;

import sn.smd.GestionLivre.entity.Auteur;
import sn.smd.GestionLivre.entity.Livre;

import java.util.List;

public interface AuteurService {


    Auteur updateAuteur(Auteur l, Long id);
    void deleteAuteurById(Long id);
    Auteur getAuteur(Long id);
    List<Auteur> getAllsAuteurs();
    Long countAuteur();

}
