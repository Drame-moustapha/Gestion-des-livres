package sn.smd.GestionLivre.config;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.web.SecurityFilterChain;

//@Configuration(proxyBeanMethods = false)
public class AuthorizationServerConfig {


   // @Autowired
    private PasswordEncoder passwordEncoder;

   // @Bean
    //@Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain authServerSecurityFilterChain(HttpSecurity http) throws Exception {
        OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);

        return http.formLogin(Customizer.withDefaults()).build();
    }
/*
   // @Bean
    public RegisteredClientRepository registeredClientRepository() {
        RegisteredClient registeredClient = RegisteredClient.withId(UUID.randomUUID().toString())
                .clientId("api-client")
                .clientSecret(passwordEncoder.encode("secret"))
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .authorizationGrantType(AuthorizationGrantType.PASSWORD)
                .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                .redirectUri("http://127.0.0.1:8080/login/oauth2/code/api-client-oidc")
                .redirectUri("http://127.0.0.1:8080/authorized")
                .scope(OidcScopes.OPENID)
                .scope("api.read")
                .clientSettings(ClientSettings.builder().requireAuthorizationConsent(true).build())
                .build();


        return new InMemoryRegisteredClientRepository(registeredClient);
    }
*/
	/*
	 * @Bean public JWKSource<SecurityContext> jwkSource() { RSAKey rsaKey =
	 * generateRsa(); JWKSet jwkSet = new JWKSet(rsaKey); return (jwkSelector,
	 * securityContext) -> jwkSelector.select(jwkSet); }
	 * 
	 * private static RSAKey generateRsa() { KeyPair keyPair = generateRsaKey();
	 * RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic(); RSAPrivateKey
	 * privateKey = (RSAPrivateKey) keyPair.getPrivate(); return new
	 * RSAKey.Builder(publicKey) .privateKey(privateKey)
	 * .keyID(UUID.randomUUID().toString()) .build(); }
	 * 
	 * private static KeyPair generateRsaKey() { KeyPair keyPair; try {
	 * KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
	 * keyPairGenerator.initialize(2048); keyPair =
	 * keyPairGenerator.generateKeyPair(); } catch (Exception ex) { throw new
	 * IllegalStateException(ex); } return keyPair; }
	 */
/*
    @Bean
    public ProviderSettings providerSettings() {
        return ProviderSettings.builder()
                .issuer("http://auth-server:9000")
                .build();
    }*/
}
