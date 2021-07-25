package hu.flowacademy.service;

import hu.flowacademy.exception.ValidateException;
import hu.flowacademy.model.Flight;
import hu.flowacademy.repository.FlightRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


import static org.mockito.Mockito.when;


@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class FlightServiceTest {

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    @InjectMocks
    private FlightService flightService;

    @Mock
    private FlightRepository flightRepository;

    @Test
    public void testSaveValidateFailing() {
        assertThrows(ValidateException.class,
                () -> flightService.create(
                        giveFlightWithoutDepartureCity()
                ));
        assertThrows(ValidateException.class,
                () -> flightService.create(
                        giveFlightWithoutDestination()));
        assertThrows(ValidateException.class,
                () -> flightService.create(
                        giveFlightWithoutDepartureTime()));
        assertThrows(ValidateException.class,
                () -> flightService.create(
                        giveFlightWithoutArrivalTime()));
        assertThrows(ValidateException.class,
                () -> flightService.create(
                        giveFlightWithTheSameCities()));
    }

    @Test
    public void testSave() {
        Flight expectedFlight = givenValidFlight();
        Flight actualFlight = whenSavingFlight(expectedFlight);
        assertEquals(expectedFlight, actualFlight);
        verify(flightRepository).save(any());
    }

    private Flight giveFlightWithoutDepartureCity() {
        return Flight.builder().destination("City").departure(LocalDateTime.parse("2021-03-04 13:45", formatter))
                .arrival(LocalDateTime.parse("2021-03-05 16:25", formatter)).build();
    }

    private Flight giveFlightWithoutDestination() {
        return Flight.builder().city("City").departure(LocalDateTime.parse("2021-03-04 13:45", formatter))
                .arrival(LocalDateTime.parse("2021-03-05 18:45", formatter)).build();
    }

    private Flight giveFlightWithoutDepartureTime() {
        return Flight.builder().city("City").destination("City2")
                .arrival(LocalDateTime.parse("2021-03-04 13:45", formatter)).build();
    }

    private Flight giveFlightWithoutArrivalTime() {
        return Flight.builder().city("City").destination("City2")
                .departure(LocalDateTime.parse("2021-03-04 13:45", formatter)).build();
    }

    private Flight giveFlightWithTheSameCities() {
        return Flight.builder().city("City").destination("City")
                .departure(LocalDateTime.parse("2021-03-04 13:45", formatter))
                .arrival(LocalDateTime.parse("2021-03-06 13:45", formatter)).build();
    }

    private Flight givenValidFlight() {
        return Flight.builder().city("City").destination("City2")
                .departure(LocalDateTime.parse("2021-03-04 13:45", formatter))
                .arrival(LocalDateTime.parse("2021-03-06 13:45", formatter)).build();
    }

    private Flight whenSavingFlight(Flight expectedFlight) {
        when(flightRepository.save(any()))
                .thenReturn(expectedFlight.toBuilder().build());
        return flightService.create(
                expectedFlight
        );
    }
}