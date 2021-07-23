package hu.flowacademy.service;

import hu.flowacademy.dto.FlightDto;
import hu.flowacademy.model.Flight;
import hu.flowacademy.repository.FlightRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository flightRepository;

    public List<FlightDto> listAll(String userId) {
        return flightRepository.findAllByUserId(userId).stream().filter(flight -> !flight.isUpcoming())
                .map(FlightDto::toDto).collect(Collectors.toList());
    }

    public Flight update(Long id) {
        Flight temp = flightRepository.findById(id).orElseThrow();
        log.info("Flight updated: {}", temp);
        return flightRepository.save(temp.toBuilder().id(id).isUpcoming(!temp.isUpcoming()).build());
    }

    public Flight create(Flight flight) {
        log.info("Flight created: {}", flight);
        return flightRepository.save(flight);
    }

    public void delete(Long id) {
        log.info("Flight deleted with the id: {}", id);
        flightRepository.deleteById(id);
    }

    public List<FlightDto> upcomings(String userId) {
        return flightRepository.findAllByUserId(userId).stream().filter(Flight::isUpcoming)
                .map(FlightDto::toDto).collect(Collectors.toList());
    }
}
