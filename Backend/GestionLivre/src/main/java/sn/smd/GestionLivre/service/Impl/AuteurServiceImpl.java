package sn.smd.GestionLivre.service.Impl;

import org.springframework.stereotype.Service;
import sn.smd.GestionLivre.entity.Auteur;
import sn.smd.GestionLivre.entity.Livre;
import sn.smd.GestionLivre.exceptions.NotFoundExceptions;
import sn.smd.GestionLivre.repository.AuteurRepository;
import sn.smd.GestionLivre.service.AuteurService;

import java.util.List;
@Service
public class AuteurServiceImpl implements AuteurService {

   private final AuteurRepository auteurRepository;

    public AuteurServiceImpl(AuteurRepository auteurRepository) {
        this.auteurRepository = auteurRepository;
    }

    /**
     * @param auteur
     * @param id
     * @return
     */
    @Override
    public Auteur updateAuteur(Auteur auteur, Long id) {
        Auteur a=this.getAuteur(id);
        if (auteurRepository.findById(id).isPresent()) {

            a.setNom(auteur.getNom());
            a.setPrenom(auteur.getPrenom());
            a.setSexe(auteur.getSexe());
            a.setBiographie(auteur.getBiographie());
           // a.setUsername(aut.getUsername());
            //a.setPassword(aut.getPassword());
            //a.setRoles(aut.getRoles());
            return auteurRepository.save(a);
        }else{
            throw new NotFoundExceptions("Auteur non existant");
        }
    }

    /**
     * @param id
     */
    @Override
    public void deleteAuteurById(Long id) {
        Auteur auteur = this.getAuteur(id);
        this.auteurRepository.delete(auteur);
    }

    /**
     * @param id
     * @return
     */
    @Override
    public Auteur getAuteur(Long id) {
        return auteurRepository.findById(id).orElseThrow(()->new NotFoundExceptions("L'auteur ayant l'id " + id + " n'existe pas"));
    }

    /**
     * @return
     */
    @Override
    public List<Auteur> getAllsAuteurs() {
        return auteurRepository.findAll();
    }

    /**
     * @return
     */
    @Override
    public Long countAuteur() {
        return auteurRepository.count();
    }
}
