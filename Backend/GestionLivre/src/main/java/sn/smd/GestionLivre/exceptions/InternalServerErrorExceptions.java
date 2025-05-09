package sn.smd.GestionLivre.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)

public class InternalServerErrorExceptions extends RuntimeException {
    //private final String message;

    public InternalServerErrorExceptions(String message) {

        super(message);

        //this.message = message;
    }
}