package sn.smd.GestionLivre.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sn.smd.GestionLivre.entity.Livre;
import sn.smd.GestionLivre.service.FileStorageService;
import sn.smd.GestionLivre.service.LivreService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/v1/livres")
@CrossOrigin(origins = {"http://localhost:3000"})
@AllArgsConstructor
public class LivreController {


    private LivreService livreService;
    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(LivreController.class);
    private FileStorageService fileStorageService;

    @PostMapping
    public ResponseEntity<Livre> createLivre(@RequestBody Livre livre) {
        Livre createlivre = livreService.createLivre(livre);
        return new ResponseEntity<>(createlivre, HttpStatus.CREATED);
    }
    @GetMapping("/auteur/{id}")
    public ResponseEntity<List<Livre>> getAllsLivresByAuteur(@PathVariable Long id) {
        List<Livre> livres = livreService.getAllsLivresByAuteur(id);
        return new ResponseEntity<>(livres, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livre> getLivre(@PathVariable Long id) {
        return ResponseEntity.ok(livreService.getLivre(id));
    }
    @GetMapping()
    public ResponseEntity<List<Livre>> getAllsLivres() {
        List<Livre> lives = livreService.getAllsLivres();
        if (lives == null || lives.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(lives);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Livre> updateLivre(@PathVariable  Long id, @RequestBody Livre livre) {
        Livre updateUser = livreService.updateLivre(livre,id);
        return new ResponseEntity<>(updateUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivreById(@PathVariable  Long id) {
        livreService.deleteLivreById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteLivre(@RequestBody Livre livre) {
        livreService.deleteLivre(livre);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/count")
    public ResponseEntity<Long> countLivre() {
        return ResponseEntity.ok(livreService.countLivre());
    }
    //télécharger le fichier
    @PostMapping( "/upload")
    public ResponseEntity<String> uploadFile(@RequestBody MultipartFile file) {

        if ( file.isEmpty()) {
            logger.error("upload fichier livre error: Le fichier est null ou vide.");
            return ResponseEntity.badRequest().body("Le fichier est null ou vide.");
        }
        if (file.getSize() > 5 * 1024 * 1024) {
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body("Fichier trop volumineux. Taille maximale autorisée : 5 Mo.");
        }

        try {
            Path directory = Paths.get(fileStorageService.getBaseDirectory());
            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
                logger.info("Répertoire créé : {}", directory);
            }

            String fileName = fileStorageService.storeFile(file);
            logger.info("{} : Fichier téléchargé avec succès", fileName);
            return ResponseEntity.ok("Fichier téléchargé avec succès");

        } catch (Exception e) {
            logger.error("Erreur lors de l'enregistrement du fichier : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne : impossible de télécharger le fichier.");
        }
    }


    @GetMapping("/file/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) throws IOException {

        Resource file = fileStorageService.getFile(fileName);
        // Créer une réponse avec le contenu du fichier

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }


}
