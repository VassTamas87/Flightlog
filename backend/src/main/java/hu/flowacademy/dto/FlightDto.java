package hu.flowacademy.dto;

import hu.flowacademy.model.Flight;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.temporal.ChronoUnit;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FlightDto {

    private Long id;
    private String city;
    private String destination;
    private LocalDateTime departure;
    private LocalDateTime arrival;
    private Long duration;

    public static FlightDto toDto(Flight flight) {
        FlightDto flightDto = new FlightDto();
        flightDto.setId(flight.getId());
        flightDto.setCity(flight.getCity());
        flightDto.setDestination(flight.getDestination());
        flightDto.setDeparture(flight.getDeparture());
        flightDto.setArrival(flight.getArrival());
        flightDto.setDuration(getTravelTime(flight.getDeparture(), flight.getArrival()));
        return flightDto;
    }

    public static Long getTravelTime(LocalDateTime from, LocalDateTime to) {
        return ChronoUnit.MILLIS.between(from, to);
    }
}