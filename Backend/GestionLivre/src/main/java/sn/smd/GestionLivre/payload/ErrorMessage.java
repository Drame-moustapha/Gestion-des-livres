
package sn.smd.GestionLivre.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ErrorMessage {
    
    private Date timestamp;
    private int status;
    private String message;
    private String description;
    
}
