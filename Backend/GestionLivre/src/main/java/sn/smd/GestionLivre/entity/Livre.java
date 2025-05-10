package sn.smd.GestionLivre.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Setter @Getter
@AllArgsConstructor
@NoArgsConstructor
public class Livre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private Double prix;
    private String langue;
    private String resume;
    private String fichier;

    @ManyToOne
    private Auteur auteur;


}