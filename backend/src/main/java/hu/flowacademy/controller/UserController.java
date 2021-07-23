package hu.flowacademy.controller;

import hu.flowacademy.model.User;
import hu.flowacademy.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping("/users/current")
    public User getCurrentUser(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }
}
