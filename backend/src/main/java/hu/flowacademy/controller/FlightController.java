package hu.flowacademy.controller;

import hu.flowacademy.dto.CitiesDto;
import hu.flowacademy.dto.FlightDto;
import hu.flowacademy.dto.SaveDto;
import hu.flowacademy.model.Flight;
import hu.flowacademy.model.User;
import hu.flowacademy.repository.UserRepository;
import hu.flowacademy.service.FlightService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/flights")
public class FlightController {

    private final FlightService flightService;
    private final UserRepository userRepository;

    @GetMapping("/listall/{userId}")
    public List<FlightDto> listAll(@PathVariable String userId) {
        return flightService.listAll(userId);
    }

    @PostMapping("/save/{userId}")
    public Flight create(@RequestBody SaveDto saveDto, @PathVariable String userId) {
        User user = userRepository.findFirstById(userId);
        Flight flight = Flight.builder().city(saveDto.getCity()).destination(saveDto.getDestination())
                .departure(saveDto.getDeparture()).arrival(saveDto.getArrival()).user(user).build();
        log.info("Saved flight: {}", flight);
        return flightService.create(flight);
    }

    @GetMapping("/longest/{userId}")
    public FlightDto longest(@PathVariable String userId) {
        try {
            List<FlightDto> dtoList = flightService.listAll(userId).stream().
                    sorted(Comparator.comparing(FlightDto::getDuration).reversed()
                            .thenComparing(FlightDto::getDeparture).reversed()).collect(Collectors.toList());
            return dtoList.get(dtoList.size() - 1);
        } catch (IndexOutOfBoundsException e) {
            log.info("The flight list is empty!");
        }
        return null;
    }

    @GetMapping("/total/{userId}")
    public int total(@PathVariable String userId) {
        long travelTimeSumInMillis = flightService.listAll(userId)
                .stream().mapToLong(FlightDto::getDuration).sum();
        return (int) ((travelTimeSumInMillis / 1000) / 3600);
    }

    @GetMapping("/cities/{userId}")
    public List<CitiesDto> getCities(@PathVariable String userId) {
        return CitiesDto.toDto(flightService.listAll(userId));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        flightService.delete(id);
        return ResponseEntity.accepted().build();
    }
}
