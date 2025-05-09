
package sn.smd.GestionLivre.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenExceptions extends RuntimeException{
    private final String message;

    public ForbiddenExceptions(String message) {
        this.message = message;
    }
    
    
    
    
}
