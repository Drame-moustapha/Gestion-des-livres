package sn.smd.GestionLivre.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.smd.GestionLivre.entity.Auteur;
import sn.smd.GestionLivre.entity.Utilisateur;
import sn.smd.GestionLivre.service.AuteurService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auteurs")
@CrossOrigin(origins = {"http://localhost:3000"})

public class AuteurController {
    @Autowired
    private final AuteurService auteurService;

    public AuteurController(AuteurService auteurService) {
        this.auteurService = auteurService;
    }

    @GetMapping()
    public ResponseEntity<List<Auteur>> getAllsAuteurs() {
        List<Auteur> users = auteurService.getAllsAuteurs();
        if (users == null || users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auteur> getAuteur(@PathVariable  Long id) {
        return ResponseEntity.ok(auteurService.getAuteur(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Auteur> updateAuteur(@PathVariable  Long id, @RequestBody Auteur user) {
        Auteur updateUser = auteurService.updateAuteur(user,id);
        return new ResponseEntity<>(updateUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuteur(@PathVariable  Long id) {
        auteurService.deleteAuteurById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countAuteur() {
        Long total = auteurService.countAuteur();
        return ResponseEntity.ok(total);
    }
}
