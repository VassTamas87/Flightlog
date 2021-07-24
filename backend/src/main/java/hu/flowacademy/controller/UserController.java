package hu.flowacademy.controller;

import hu.flowacademy.model.User;
import hu.flowacademy.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @GetMapping("/users/current")
    public User getCurrentUser(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }
}
