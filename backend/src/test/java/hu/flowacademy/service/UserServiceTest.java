package hu.flowacademy.service;

import hu.flowacademy.exception.ValidateException;
import hu.flowacademy.model.User;
import hu.flowacademy.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Spy
    private PasswordEncoder passwordEncoder;

    @Test
    public void testSaveValidateFailing() {
        assertThrows(ValidateException.class,
                () -> userService.save(
                        giveUserWithoutUsername()
                ));
        assertThrows(ValidateException.class,
                () -> userService.save(
                        giveUserWithoutPassword()));
    }

    @Test
    public void testSave() {
        User expectedUser = givenValidUser();
        User actualUser = whenSavingUser(expectedUser);
        assertEquals(expectedUser, actualUser);
        verify(userRepository).save(any());
    }

    private User giveUserWithoutUsername() {
        return User.builder()
                .password("123456")
                .build();
    }

    private User giveUserWithoutPassword() {
        return User.builder()
                .username("User123")
                .build();
    }

    private User givenValidUser() {
        return User.builder()
                .username("User456")
                .password("123456")
                .build();
    }

    private User whenSavingUser(User expectedUser) {
        when(userRepository.save(any()))
                .thenReturn(expectedUser.toBuilder().build());
        return userService.save(
                expectedUser
        );
    }
}
