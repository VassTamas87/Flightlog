package hu.flowacademy.service;

import hu.flowacademy.exception.ValidateException;
import hu.flowacademy.model.Role;
import hu.flowacademy.model.User;
import hu.flowacademy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User save(User user) {
        validate(user);
        log.info("User created with the username: {}", user.getUsername());
        return userRepository.save(user.toBuilder()
                .password(passwordEncoder.encode(user.getPassword())).role(Role.ROLE_USER)
                .build());
    }

    public void validate(User user) {
        if (userRepository.findFirstByUsername(user.getUsername()).isPresent()) {
            throw new ValidateException("Username already exists!");
        }
    }
}


