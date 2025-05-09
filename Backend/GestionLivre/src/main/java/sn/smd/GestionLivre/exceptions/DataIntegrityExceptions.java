/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sn.smd.GestionLivre.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@Getter
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class DataIntegrityExceptions extends RuntimeException{
    
    private final String message;

    public DataIntegrityExceptions(String message) {
        super(message);
        this.message = message;
    }

    
    
}
