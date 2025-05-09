package sn.smd.GestionLivre.controller;


import java.util.Collections;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sn.smd.GestionLivre.payload.LoginRequest;
import sn.smd.GestionLivre.service.Impl.AuthService;


@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"http://localhost:3000"})
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder encoder;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);


    @PostMapping("/login")
    public Map<String, String> login(
            @RequestParam String username, @RequestParam String password
    ) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            username=authentication.getName();
            Map<String, String> idToken = authService.generateToken(username);
            System.out.println(authService.validateToken(idToken.get("token")));
            return idToken;

        }catch (BadCredentialsException e) {
            return Collections.singletonMap("error code 401", "Identifiant ou mot de passe incorrect.");

        } catch (DisabledException e) {
            return Collections.singletonMap("error code 403", "Compte utilisateur désactivé.");
        } catch (LockedException e) {
            return Collections.singletonMap("error code 403", "Compte utilisateur verrouilé.");
        } catch (Exception e) {

            return Collections.singletonMap("error code 500", "Erreur interne du serveur.");
        }


    }


    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        logger.info("Tentative de connexion pour l'utilisateur : {}", loginRequest.getUsername());

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            String username = authentication.getName();
            logger.info("Authentification réussie pour l'utilisateur : {}", username);
            Map<String, String> idToken = authService.generateToken(username);
            return ResponseEntity.ok(idToken);
        } catch (BadCredentialsException e) {
            logger.warn("Échec de l'authentification pour l'utilisateur : {}", loginRequest.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiant ou mot de passe incorrect.");
        } catch (DisabledException e) {
            logger.warn("Échec de l'authentification pour l'utilisateur : {} - utilisateur desactivé" , loginRequest.getUsername());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Compte utilisateur désactivé.");
        } catch (LockedException e) {
            logger.warn("Échec de l'authentification pour l'utilisateur : {} - utilisateur verrouilé", loginRequest.getUsername());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Compte utilisateur verrouillé.");
        } catch (Exception e) {
            logger.warn("Erreur lors de l'authentification", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne du serveur.");
        }
    }
}
