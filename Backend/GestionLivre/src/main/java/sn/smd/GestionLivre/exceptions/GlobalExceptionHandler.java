
package sn.smd.GestionLivre.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import sn.smd.GestionLivre.payload.ErrorMessage;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundExceptions.class)
    public ResponseEntity<ErrorMessage> handleNotFoundExceptions(NotFoundExceptions ex, WebRequest request) {

        ErrorMessage message = new ErrorMessage(new Date(),
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ConflictExceptions.class)
    public ResponseEntity<ErrorMessage> handleConflictExceptions(ConflictExceptions ex, WebRequest request) {

        ErrorMessage message = new ErrorMessage(new Date(),
            HttpStatus.CONFLICT.value(),
            ex.getMessage(),
            request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.CONFLICT);
    }
    
    @ExceptionHandler(BadRequestExceptions.class)
    public ResponseEntity<ErrorMessage> handleBadRequestExceptions(BadRequestExceptions ex, WebRequest request) {

        ErrorMessage message = new ErrorMessage(new Date(),
            HttpStatus.BAD_REQUEST.value(),
            ex.getMessage(),
            request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }
/*
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> handleGlobalExceptions(Exception ex, WebRequest request) {

        ErrorMessage message = new ErrorMessage(new Date(),
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            ex.getMessage(),
            request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
*/
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> notValid(MethodArgumentNotValidException ex, HttpServletRequest request) {
        
        Map<String, String> errors = new HashMap<>();
        ex.getAllErrors().forEach(err -> {
            String nomChamp = ((FieldError) err).getField();
            String message = err.getDefaultMessage();
            errors.put(nomChamp, message);
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

}
