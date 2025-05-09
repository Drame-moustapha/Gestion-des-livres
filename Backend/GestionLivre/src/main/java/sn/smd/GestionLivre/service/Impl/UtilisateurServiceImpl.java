package sn.smd.GestionLivre.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sn.smd.GestionLivre.entity.Auteur;
import sn.smd.GestionLivre.entity.Role;
import sn.smd.GestionLivre.entity.Utilisateur;
import sn.smd.GestionLivre.exceptions.ConflictExceptions;
import sn.smd.GestionLivre.exceptions.NotFoundExceptions;
import sn.smd.GestionLivre.model.Auteurs;
import sn.smd.GestionLivre.payload.ChangePasswordRequest;
import sn.smd.GestionLivre.payload.ResetPasswordRequest;
import sn.smd.GestionLivre.repository.AuteurRepository;
import sn.smd.GestionLivre.repository.RoleRepository;
import sn.smd.GestionLivre.repository.UtilisateurRepository;
import sn.smd.GestionLivre.service.UtilisateurService;
import sn.smd.GestionLivre.service.envoi_email.EnvoiEmailService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {
    @Autowired
    private final UtilisateurRepository utilisateurRepository;
    private final AuteurRepository auteurRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EnvoiEmailService envoiEmailService;

    public UtilisateurServiceImpl(UtilisateurRepository utilisateurRepository, AuteurRepository auteurRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, EnvoiEmailService envoiEmailService) {
        this.utilisateurRepository = utilisateurRepository;
        this.auteurRepository = auteurRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.envoiEmailService = envoiEmailService;
    }

    @Override
    public Utilisateur createUser(Utilisateur user) {
        //  Vérifier si l'utilisateur existe déjà
        if (utilisateurRepository.findByUsername(user.getUsername()) != null) {
            throw new ConflictExceptions("L'utilisateur existe déjà");
        }

        //  Valider le mot de passe obligatoire
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new IllegalArgumentException("Le mot de passe ne peut pas être vide");
        }

        //  Gestion des rôles utilisateur
        List<Role> roles = new ArrayList<>();
        String roleParDefaut = "USER";

        roleRepository.findByName(roleParDefaut)
                .ifPresentOrElse(
                        roles::add,
                        () -> { throw new NotFoundExceptions("Rôle introuvable", roleParDefaut); }
                );

        // 4. Création d'un nouvel utilisateur
        Utilisateur nouvelUtilisateur = new Utilisateur();
        nouvelUtilisateur.setNom(user.getNom());
        nouvelUtilisateur.setPrenom(user.getPrenom());
        nouvelUtilisateur.setSexe(user.getSexe());
        nouvelUtilisateur.setActif(true);
        nouvelUtilisateur.setUsername(user.getUsername());

        // Chiffrement du mot de passe
        nouvelUtilisateur.setPassword(passwordEncoder.encode(user.getPassword()));
        nouvelUtilisateur.setRoles(roles);

        //  Sauvegarde en base de données
        Utilisateur utilisateur = utilisateurRepository.save(nouvelUtilisateur);
        String txt = String.format(
                "Salut,\n\nMadame/Monsieur,\n\nVotre compte a été créé avec succès et ses informations sont :\n" +
                        "Username : %s\nPassword : %s\n\nCordialement,\nL'équipe Sunu Bibliothèque",
                utilisateur.getUsername(), user.getPassword()
        );

        envoiEmailService.sendEmail(utilisateur.getUsername(),"Creation du compte",txt);
        return utilisateur;
    }
    @Override

    public Auteur createAuteur(Auteurs dto) {
        //  Unicité
        if (utilisateurRepository.findByUsername(dto.getUsername()) != null) {
            throw new ConflictExceptions("Un utilisateur avec ce username existe déjà");
        }
        // 2. Validation du mot de passe
        if (dto.getPassword() == null || dto.getPassword().isBlank()) {
            throw new IllegalArgumentException("Le mot de passe ne peut pas être vide");
        }
        // 3. Récupération du rôle AUTEUR
        Role auteurRole = roleRepository.findByName("AUTEUR")
                .orElseThrow(() -> new NotFoundExceptions("Rôle introuvable", "AUTEUR"));
        //  Création de l’entité Auteur
        Auteur auteur = new Auteur();
        // — hérités de Utilisateur —
        auteur.setNom(dto.getNom());
        auteur.setPrenom(dto.getPrenom());
        auteur.setUsername(dto.getUsername());
        auteur.setSexe(dto.getSexe());
        auteur.setActif(true);
        auteur.setPassword(passwordEncoder.encode(dto.getPassword()));
        auteur.setRoles(Collections.singletonList(auteurRole));
        // — spécifiques à Auteur —
        auteur.setBiographie(dto.getBiographie());
        //  Sauvegarde (JPA générera l’INSERT dans utilisateur et dans auteur)
        return auteurRepository.save(auteur);
    }


    @Override
    public Utilisateur updateUser(Utilisateur user, Long id) {
        Utilisateur updateUser = utilisateurRepository.findById(id)
                .orElseThrow(() -> new NotFoundExceptions("L'utilisateur ayant l'ID", id.toString()));

        /*Le mot de passe se change dans changePassword()
        updateCompte.setPassword(passwordEncoder.encode(compte.getPassword()));*/
        updateUser.setNom(user.getNom());
        updateUser.setPrenom(user.getPrenom());
        updateUser.setActif(true);
        updateUser.setSexe(user.getSexe());

       return  utilisateurRepository.save(updateUser);

    }

    @Override
    public void deleteUser(Utilisateur user) {
        utilisateurRepository.delete(user);

    }

    @Override
    public void deleteUserById(Long id) {
        Utilisateur delete = utilisateurRepository.findById(id)
                .orElseThrow(() -> new NotFoundExceptions("L'utilisateur ayant l'ID", id.toString()));
        utilisateurRepository.delete(delete);

    }

    @Override
    public List<Utilisateur> getAllsUser(Boolean actif) {
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        // Si la liste est vide, retourner une liste vide
        if (utilisateurs.isEmpty()) {
            return Collections.emptyList();
        }
        if (actif == null) {
            return  utilisateurs; // Retourne à la fois les actifs et inactifs
        }

        Boolean finalActif = actif; // Variable finale pour l'utilisation dans le stream

        return utilisateurs.stream()
                .filter(c -> {

                    // Filtrage des comptes actifs ou inactifs selon la valeur de 'actif'
                    if (finalActif) {
                        // Comptes actifs
                        return c.isActif();
                    } else {
                        // Comptes inactifs
                        return !c.isActif() ;
                    }
                })
                .collect(Collectors.toList());
    }

    @Override
    public Utilisateur getUserById(Long id) {

        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new NotFoundExceptions("L'utilisateur ayant l'ID", id.toString()));
    }

    @Override
    public Utilisateur getByUsername(String username) {
        Utilisateur user = utilisateurRepository.findByUsername(username);
        if(user==null) {
            throw new NotFoundExceptions("L'utilisateur ayant comme username", username);
        }else{
        return user;
        }
    }

    @Override
    public Utilisateur activeOuDesactiveCompte(Utilisateur user) {

        Utilisateur updateCompte = utilisateurRepository.findById(user.getId())
                    .orElseThrow(() -> new NotFoundExceptions("L'individu ayant l'ID", user.getId().toString()));
        updateCompte.setActif(!user.isActif());
            return utilisateurRepository.save(updateCompte);

    }

    @Override
    public boolean changePassword(ChangePasswordRequest request) {
        return false;
    }

    @Override
    public boolean resetPassword(ResetPasswordRequest request) {
        return false;
    }

    @Override
    public boolean reinitialisation(Long compteId) {
        return false;
    }

    @Override
    public Long countUtilisateur() {
        return utilisateurRepository.count();
    }

    @Override
    public Utilisateur activerCompte(Utilisateur user) {
        Utilisateur updateUser = utilisateurRepository.findById(user.getId())
                .orElseThrow(() -> new NotFoundExceptions("L'utilisateur ayant l'ID", user.getId().toString()));
        updateUser.setActif(true);
        return utilisateurRepository.save(updateUser);
    }




}
