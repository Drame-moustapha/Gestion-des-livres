package sn.smd.GestionLivre.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import sn.smd.GestionLivre.entity.Auteur;
import sn.smd.GestionLivre.entity.Utilisateur;
import sn.smd.GestionLivre.model.Auteurs;
import sn.smd.GestionLivre.service.UtilisateurService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/utilisateurs")
@CrossOrigin(origins = {"http://localhost:3000"})


public class UtilisateurController {
    @Autowired
    private UtilisateurService utilisateurService;


    @PostMapping
    public ResponseEntity<Utilisateur> createUser(@RequestBody Utilisateur user) {
        Utilisateur createCompte = utilisateurService.createUser(user);
        return new ResponseEntity<>(createCompte, HttpStatus.CREATED);
    }
    @PostMapping("/auteur")
    public ResponseEntity<Auteur> createAuteur(@RequestBody Auteurs user) {
        Auteur createCompte = utilisateurService.createAuteur(user);
        return new ResponseEntity<>(createCompte, HttpStatus.CREATED);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Utilisateur> getCompteByUsername(@PathVariable  String username) {
        return ResponseEntity.ok(utilisateurService.getByUsername(username));
    }
    @GetMapping()
    public ResponseEntity<List<Utilisateur>> getAllUtilisateurs(@RequestParam(required = false) Boolean actif) {
        List<Utilisateur> users = utilisateurService.getAllsUser(actif);
        if (users == null || users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(users);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUser(@PathVariable  Long id) {
        return ResponseEntity.ok(utilisateurService.getUserById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Utilisateur> updateUser(@PathVariable  Long id, @RequestBody Utilisateur user) {
        Utilisateur updateUser = utilisateurService.updateUser(user,id);
        return new ResponseEntity<>(updateUser, HttpStatus.CREATED);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countUser() {
        return ResponseEntity.ok(utilisateurService.countUtilisateur());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable  Long id) {
       utilisateurService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteUser(@RequestBody Utilisateur user) {
        utilisateurService.deleteUser(user);
        return ResponseEntity.noContent().build();
    }


}
