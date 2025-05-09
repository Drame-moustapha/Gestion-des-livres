package sn.smd.GestionLivre.service;

import sn.smd.GestionLivre.entity.Livre;

import java.util.List;

public interface LivreService {

    Livre createLivre(Livre l);
    Livre updateLivre(Livre l, Long id);
    void deleteLivre(Livre l);
    void deleteLivreById(Long id);
    Livre getLivre(Long id);
    List<Livre> getAllsLivres();
    List<Livre> getAllsLivresByAuteur(Long id);
    Long countLivre();



}
