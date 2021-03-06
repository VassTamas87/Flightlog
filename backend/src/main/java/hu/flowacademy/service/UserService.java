package hu.flowacademy.service;

import hu.flowacademy.exception.ValidateException;
import hu.flowacademy.model.Role;
import hu.flowacademy.model.User;
import hu.flowacademy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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
                .password(passwordEncoder.encode(user.getPassword())).role(Role.USER)
                .build());
    }

    public void delete(String id) {
        User user = userRepository.findFirstById(id);
        log.info("User deleted with the username: {} and id: {}", user.getUsername(), id);
        userRepository.deleteById(id);
    }

    public User update(String id, String username, String password, String position) {
        User user = userRepository.findFirstById(id);
        log.info("User modified with id: {}", id);
        return userRepository.save(user.toBuilder().id(id).username(username != null ? username : user.getUsername())
                .password(password != null ? passwordEncoder.encode(password) : user.getPassword())
                .position(position != null ? position : user.getPosition()).build());

    }

    public void validate(User user) {
        if (userRepository.findFirstByUsername(user.getUsername()).isPresent()) {
            throw new ValidateException("Username already exists!");
        }
        if (!StringUtils.hasText(user.getUsername())) {
            throw new ValidateException("Username is missing!");
        }
        if (!StringUtils.hasText(user.getPassword())) {
            throw new ValidateException("Password is missing!");
        }
    }
}


