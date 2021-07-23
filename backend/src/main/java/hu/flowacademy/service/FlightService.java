package hu.flowacademy.service;

import hu.flowacademy.dto.FlightDto;
import hu.flowacademy.model.Flight;
import hu.flowacademy.repository.FlightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository flightRepository;

    public List<FlightDto> listAll(String userId) {
        return flightRepository.findAllByUserId(userId).stream().map(FlightDto::toDto).collect(Collectors.toList());
    }

    public Flight create(Flight flight) {
        return flightRepository.save(flight);
    }

    public void delete(Long id) {
        flightRepository.deleteById(id);
    }
}
