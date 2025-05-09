package sn.smd.GestionLivre.service.Impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import sn.smd.GestionLivre.entity.Utilisateur;
import sn.smd.GestionLivre.repository.UtilisateurRepository;


import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AuthService {

	@Autowired
	private UtilisateurRepository compteRepository;
	
	private final JwtEncoder jwtEncoder;
	private final JwtDecoder jwtDecoder;

    public AuthService(JwtEncoder jwtEncoder, JwtDecoder jwtDecoder) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder =  jwtDecoder;
    }

	
	 public Map<String,String> generateToken(String username){
	        Utilisateur appUser=compteRepository.findByUsername(username);
	        
	        String scope=appUser.getRoles().stream().map(r->r.getName()).collect(Collectors.joining(" "));
	        Map<String,String> idToken=new HashMap<>();
	        Instant instant=Instant.now();

	        JwtClaimsSet claims = JwtClaimsSet.builder()
	                .issuer("your-issuer")  // Remplacez par votre émetteur
	                .issuedAt(instant)
	                .expiresAt(instant.plusSeconds(3600*24))  // Expiration dans 24 heure
	                .subject(appUser.getUsername())
	                .claim("scope", scope)
	                .build();
	        //String jwtAccessToken=jwtEncoder.encode(JwtEncoderParameters.from(jwtClaimsSet)).getTokenValue();
	        String jwtAccessToken	= jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	        idToken.put("token",jwtAccessToken);

	        return idToken;
	    }
	 
	 
	    public boolean validateToken(String token) {
	        try {
	            jwtDecoder.decode(token);
	            return true;  // Le token est valide
	        } catch (JwtException e) {
	            e.printStackTrace();
	            return false;  // Le token est invalide
	        }
	    }
}
