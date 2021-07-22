package hu.flowacademy.controller;

import hu.flowacademy.dto.CitiesDto;
import hu.flowacademy.dto.FlightDto;
import hu.flowacademy.dto.SaveDto;
import hu.flowacademy.model.Flight;
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
public class FlightController {

    private final FlightService flightService;

    @GetMapping("flights")
    public List<FlightDto> listAll() {
        return flightService.listAll();
    }

    @PostMapping("save")
    public Flight create(@RequestBody SaveDto saveDto) {
        Flight flight = Flight.builder().city(saveDto.getCity()).destination(saveDto.getDestination())
                .departure(saveDto.getDeparture()).arrival(saveDto.getArrival()).build();
        log.info("Saved flight: {}", flight);
        return flightService.create(flight);
    }

    @GetMapping("longest")
    public FlightDto longest() {
        try {
            List<FlightDto> dtoList = flightService.listAll().stream().
                    sorted(Comparator.comparing(FlightDto::getDuration).reversed()
                            .thenComparing(FlightDto::getDeparture).reversed()).collect(Collectors.toList());
            return dtoList.get(dtoList.size() - 1);
        } catch (IndexOutOfBoundsException e) {
            log.info("The flight list is empty!");
        }
        return null;
    }

    @GetMapping("total")
    public int total() {
        long travelTimeSumInMillis = flightService.listAll()
                .stream().mapToLong(FlightDto::getDuration).sum();
        return (int) ((travelTimeSumInMillis / 1000) / 3600);
    }

    @GetMapping("cities")
    public List<CitiesDto> getCities() {
        return CitiesDto.toDto(flightService.listAll());
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        flightService.delete(id);
        return ResponseEntity.accepted().build();
    }
}
