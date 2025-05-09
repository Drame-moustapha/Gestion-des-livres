package sn.smd.GestionLivre.payload;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ChangePasswordRequest {
    
    @NotNull(message = "L'id du de l'utilisateur ne doit pas etre nul")
    private Long utilisateurId;
    
    @NotEmpty(message = "L'ancien mot de passe ne doit pas etre vide")
    @Size(min = 8, message = "L'ancien mot de passe contenir au minimum 8 caracteres")
    @Column(nullable = false)
    private String oldPassword;
    
    @NotEmpty(message = "Le nouveau mot de passe ne doit pas etre vide")
    @Size(min = 8, message = "Le nouveau mot de passe contenir au minimum 8 caracteres")
    @Column(nullable = false)
    private String newPassword;
}
