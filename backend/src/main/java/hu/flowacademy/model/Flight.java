package hu.flowacademy.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Flight {

    @Id
    @GeneratedValue
    private Long id;
    private String city;
    private String destination;
    private LocalDateTime departure;
    private LocalDateTime arrival;
    private boolean isUpcoming;
    private String plane;

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private User user;

    public String toString() {
        return "Departure city: " + this.getCity() + " Destination city: " + this.getDestination()
                + " Departure time: " + this.getDeparture() + " Arrival time: " + this.getArrival();
    }
}
