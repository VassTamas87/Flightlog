package hu.flowacademy.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.MimeTypeUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@Slf4j
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    public AuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
        setFilterProcessesUrl("/login");
    }

    @Override
    @SneakyThrows
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginRequest loginRequest = objectMapper.readValue(request.getReader(), LoginRequest.class);
        log.info("Login started with username: {}", loginRequest.getUsername());

        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword(),
                        List.of()
                )
        );
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult)
            throws IOException, ServletException {
        UserDetails principal = (UserDetails) authResult.getPrincipal();
        log.info("Successfully login with {}", principal.getUsername());

        String jwtToken = Jwts.builder()
                .setSubject(principal.getUsername())
                .setIssuedAt(new Date())
                .signWith(Keys.hmacShaKeyFor(("f6cf0b0044d6f75d024aaf55a49f206be9276b9d42b6f493c229e33c9c66fb30f8f" +
                        "410adcc1cad4b8ac346d6d8580c73ba0ee90003b0c24faf7d15c6f2bf76a5").getBytes()), SignatureAlgorithm.HS512)
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
                .claim("roles", principal.getAuthorities())
                .compact();

        response.setHeader("jwt-token", jwtToken);
        response.setCharacterEncoding("UTF-8");
        response.setContentType(MimeTypeUtils.APPLICATION_JSON_VALUE);

        response.getWriter().print(
                new ObjectMapper()
                        .writeValueAsString(
                                new LoginResponse(jwtToken)
                        )
        );
    }

    @Data
    @NoArgsConstructor
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    @AllArgsConstructor
    public static class LoginResponse {
        private String token;
    }
}