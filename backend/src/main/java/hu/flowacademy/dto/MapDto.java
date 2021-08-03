package hu.flowacademy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MapDto {

    private String city;
    private String destination;

    public static MapDto toDto(FlightDto flightDto) {
        MapDto mapDto = new MapDto();
        mapDto.setCity(flightDto.getCity());
        mapDto.setDestination(flightDto.getDestination());
        return mapDto;
    }
}