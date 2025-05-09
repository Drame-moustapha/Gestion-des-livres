package sn.smd.GestionLivre.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.smd.GestionLivre.entity.Auteur;
import sn.smd.GestionLivre.entity.Livre;
import sn.smd.GestionLivre.exceptions.NotFoundExceptions;
import sn.smd.GestionLivre.repository.AuteurRepository;
import sn.smd.GestionLivre.repository.LivreRepository;
import sn.smd.GestionLivre.service.LivreService;

import java.util.List;
import java.util.Optional;

@Service
public class LivreServiceImpl implements LivreService {

    @Autowired
    private  LivreRepository livreRepository;
    private final AuteurRepository auteurRepository;
    public LivreServiceImpl(LivreRepository livreRepository, AuteurRepository auteurRepository) {
        this.livreRepository = livreRepository;
        this.auteurRepository = auteurRepository;
    }


    @Override
    public Livre createLivre(Livre l) {
        Optional<Auteur> auteur = auteurRepository.findById(l.getAuteur().getId());
        if (auteur.isPresent()) {
            l.setAuteur(auteur.get());
            return livreRepository.save(l);
        }else{
            throw new NotFoundExceptions("Auteur non existant");
        }

    }

    @Override
    public Livre updateLivre(Livre l, Long id) {
        Livre livre=this.getLivre(id);
        if(livre!=null){
            livre.setPrix(l.getPrix());
            livre.setTitre(l.getTitre());
            livre.setLangue(l.getLangue());

            return livreRepository.save(livre);
        }else{
            return livre;
        }


    }

    @Override
    public void deleteLivre(Livre l) {
        livreRepository.delete(l);
    }

    @Override
    public void deleteLivreById(Long id) {
        Livre deleteLivre= this.getLivre(id);
        livreRepository.delete(deleteLivre);
    }

    @Override
    public Livre getLivre(Long id) {
        return livreRepository.findById(id)
                .orElseThrow(() -> new NotFoundExceptions("Le livre ayant l'ID", id.toString()));

    }

    @Override
    public List<Livre> getAllsLivres() {
        return livreRepository.findAll();
    }

    /**
     * @param id
     * @return
     */
    @Override
    public List<Livre> getAllsLivresByAuteur(Long id) {
        return livreRepository.findAllByAuteurId(id);
    }

    /**
     * @param id
     * @return
     */
    @Override
    public Long countLivre() {
        return livreRepository.count();
    }
}
