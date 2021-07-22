package hu.flowacademy.bootstrap;

import hu.flowacademy.model.Flight;
import hu.flowacademy.repository.FlightRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class InitDataLoader implements CommandLineRunner {

    private final FlightRepository flightRepository;

    @Override
    public void run(String... args) {
        log.info("Starting init data loader");
        if (flightRepository.count() == 0) {
            executeFlightSave();
        }
    }

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private void executeFlightSave() {
        List<Flight> list = new ArrayList<>();
        Flight flight1 = Flight.builder().city("London").destination("Lisbon")
                .departure(LocalDateTime.parse("2021-03-04 13:45", formatter))
                .arrival(LocalDateTime.parse("2021-03-05 10:45", formatter)).build();
        list.add(flight1);
        Flight flight2 = Flight.builder().city("Athens").destination("Paris")
                .departure(LocalDateTime.parse("2021-04-09 09:45", formatter))
                .arrival(LocalDateTime.parse("2021-04-10 13:45", formatter)).build();
        list.add(flight2);
        Flight flight3 = Flight.builder().city("Amsterdam").destination("Barcelona")
                .departure(LocalDateTime.parse("2021-04-14 13:45", formatter))
                .arrival(LocalDateTime.parse("2021-04-14 17:45", formatter)).build();
        list.add(flight3);
        Flight flight4 = Flight.builder().city("Rome").destination("Istanbul")
                .departure(LocalDateTime.parse("2021-05-23 22:07", formatter))
                .arrival(LocalDateTime.parse("2021-05-25 03:45", formatter)).build();
        list.add(flight4);
        Flight flight5 = Flight.builder().city("Berlin").destination("Prague")
                .departure(LocalDateTime.parse("2021-06-09 13:45", formatter))
                .arrival(LocalDateTime.parse("2021-06-12 19:56", formatter)).build();
        list.add(flight5);
        Flight flight6 = Flight.builder().city("Dublin").destination("Berlin")
                .departure(LocalDateTime.parse("2020-09-04 03:49", formatter))
                .arrival(LocalDateTime.parse("2020-09-05 11:05", formatter)).build();
        list.add(flight6);
        Flight flight7 = Flight.builder().city("Munich").destination("Vienna")
                .departure(LocalDateTime.parse("2020-02-26 11:09", formatter))
                .arrival(LocalDateTime.parse("2020-02-28 21:25", formatter)).build();
        list.add(flight7);
        Flight flight8 = Flight.builder().city("Vienna").destination("Berlin")
                .departure(LocalDateTime.parse("2021-08-08 13:45", formatter))
                .arrival(LocalDateTime.parse("2021-08-09 19:05", formatter)).build();
        list.add(flight8);
        Flight flight9 = Flight.builder().city("Berlin").destination("Munich")
                .departure(LocalDateTime.parse("2021-12-23 04:45", formatter))
                .arrival(LocalDateTime.parse("2021-12-23 13:45", formatter)).build();
        list.add(flight9);
        Flight flight10 = Flight.builder().city("Munich").destination("Vienna")
                .departure(LocalDateTime.parse("2021-01-01 00:45", formatter))
                .arrival(LocalDateTime.parse("2021-01-02 06:45", formatter)).build();
        list.add(flight10);
        flightRepository.saveAll(list);
        log.info("saved {} flights", list.size());
    }
}