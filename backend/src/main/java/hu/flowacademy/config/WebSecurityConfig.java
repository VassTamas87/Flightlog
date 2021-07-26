package hu.flowacademy.config;

import hu.flowacademy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(jsr250Enabled = true, prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${app.jwtHmac}")
    private String hmacKey;

    @Autowired
    private UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(username ->
                userRepository.findFirstByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username))
        )
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().disable()
                .csrf().disable()
                .addFilter(new AuthenticationFilter(authenticationManager(), hmacKey))
                .addFilter(new AuthorizationFilter(authenticationManager(), userRepository, hmacKey))
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/flights/*").hasAnyRole("USER")
                .antMatchers(HttpMethod.POST, "/flights/*").hasAnyRole("USER")
                .antMatchers(HttpMethod.PUT, "/flights/*").hasAnyRole("USER")
                .antMatchers(HttpMethod.DELETE, "/flights/*").hasAnyRole("USER")
                .anyRequest().authenticated()
                .and()
                .formLogin().disable();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.POST, "/users");
        web.ignoring().antMatchers(HttpMethod.GET, "/picture/*");
    }
}