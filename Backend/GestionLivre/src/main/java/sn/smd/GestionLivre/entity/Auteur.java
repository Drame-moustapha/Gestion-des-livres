package sn.smd.GestionLivre.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
 @Setter @Getter
@Entity

@DiscriminatorValue("AUTEUR")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Auteur extends Utilisateur {
    private String biographie;

    @OneToMany(mappedBy = "auteur", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Livre> livres = new ArrayList<>();


}
