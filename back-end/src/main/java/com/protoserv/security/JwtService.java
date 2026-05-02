package com.protoserv.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    @Value("${api.security.token.secret}")
    private String secretKey;

    public String gerarToken(String username, String perfil) {
        long tempoExpiracao = calcularTempoExpiracao(perfil);

        return Jwts.builder()
                .subject(username)
                .claim("perfil", perfil)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + tempoExpiracao))
                .signWith(getSigningKey())
                .compact();
    }

    private long calcularTempoExpiracao(String perfil) {
        long umaHoraEmMilissegundos = 3600000;
        
        if ("ADMIN".equalsIgnoreCase(perfil) || "ATENDENTE".equalsIgnoreCase(perfil)) {
            return 12 * umaHoraEmMilissegundos;
        } else {
            return 2 * umaHoraEmMilissegundos;
        }
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String extrairUsername(String token) {
        return extrairTodasAsClaims(token).getSubject();
    }

    public boolean isTokenValido(String token, String username) {
        final String usernameExtraido = extrairUsername(token);
        return (usernameExtraido.equals(username)) && !isTokenExpirado(token);
    }

    private boolean isTokenExpirado(String token) {
        Date expiracao = extrairTodasAsClaims(token).getExpiration();
        return expiracao.before(new Date());
    }

    private Claims extrairTodasAsClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}