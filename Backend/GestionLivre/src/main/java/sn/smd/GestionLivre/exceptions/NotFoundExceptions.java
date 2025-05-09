/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sn.smd.GestionLivre.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
@Getter
public class NotFoundExceptions extends RuntimeException{
    private String nomRessource;
    private String valRessource;

    public NotFoundExceptions(String nomRessource, String valRessource) {
        super(String.format("%s %s est introuvable.! ",nomRessource, valRessource));
    }  

    public NotFoundExceptions(String message) {
        super(message);
    }
    
    
    
}
