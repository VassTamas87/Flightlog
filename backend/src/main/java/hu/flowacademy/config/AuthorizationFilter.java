package hu.flowacademy.config;

import hu.flowacademy.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class AuthorizationFilter extends BasicAuthenticationFilter {

    private final UserRepository userRepository;

    public AuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {
        String authValue = request.getHeader("Authorization");

        authValue = authValue.replaceAll("Bearer ", "");

        Claims body = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(("f6cf0b0044d6f75d024aaf55a49f206be9276b9d42b6f493c229e33c9c66fb30f8f" +
                        "410adcc1cad4b8ac346d6d8580c73ba0ee90003b0c24faf7d15c6f2bf76a5").getBytes()))
                .build()
                .parseClaimsJws(authValue)
                .getBody();

        log.info("Jwt's content is: {}", body);
        String username = body.getSubject();

        userRepository.findFirstByUsername(username)
                .ifPresent(user ->
                        SecurityContextHolder.getContext().setAuthentication(
                                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities())
                        ));
        chain.doFilter(request, response);
    }
}
