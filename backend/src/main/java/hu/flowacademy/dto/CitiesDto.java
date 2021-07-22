package hu.flowacademy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CitiesDto {

    private String city;
    private Integer count;

    public static List<CitiesDto> toDto(List<FlightDto> flight) {
        List<String> cityList = new ArrayList<>();
        for (FlightDto flightDto : flight) {
            cityList.add(flightDto.getCity());
            cityList.add(flightDto.getDestination());
        }

        Map<String, Integer> citiesMap = new HashMap<>();
        for (String s : cityList) {
            if (citiesMap.containsKey(s)) {
                citiesMap.put(s, citiesMap.get(s) + 1);
            } else
                citiesMap.put(s, 1);
        }

        List<CitiesDto> dtoList = new ArrayList<>();
        for (Map.Entry<String, Integer> el : citiesMap.entrySet()) {
            CitiesDto temp = CitiesDto.builder().city(el.getKey()).count(el.getValue()).build();
            dtoList.add(temp);
        }
        return dtoList;
    }
}
