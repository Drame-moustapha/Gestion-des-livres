
package sn.smd.GestionLivre.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;



@ResponseStatus(HttpStatus.CONFLICT)
@Getter
public class ConflictExceptions extends RuntimeException{
    private String nomRessource;
    private String valRessource;

    public ConflictExceptions(String nomRessource, String valRessource) {
        super(String.format("%s %s existe déja.! ",nomRessource, valRessource));
    }


    public ConflictExceptions(String message) {
        super(message);
    }
    

    
 
    
}
