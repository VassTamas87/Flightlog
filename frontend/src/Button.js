import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDistance, convertDistance } from "geolib";
import moment from "moment";
import duration from "moment-duration-format";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Forecast from "./Forecast";

const format = (date) => {
  return moment.duration(date, "milliseconds").format("hh:mm", { trim: false });
};

const Button = ({ flight, remove, color, updateStatus }) => {
  const handleRemove = () => remove(flight);
  const handleMouseEnter = () => setIsShown(true);
  const handleMouseLeave = () => setIsShown(false);
  const [isShown, setIsShown] = useState(false);
  const handleChange = () => updateStatus(flight);
  const [departureCity, setDepartureCity] = useState(null);
  const [destinationCity, setDestinationCity] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://api.geonames.org/searchJSON?q=${flight.city}&maxRows=1&username=VassTamas87`
        );
        console.log(response);
        setDepartureCity(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [flight.city]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://api.geonames.org/searchJSON?q=${flight.destination}&maxRows=1&username=VassTamas87`
        );
        console.log(response);
        setDestinationCity(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [flight.destination]);

  const distance =
    departureCity !== null &&
    destinationCity !== null &&
    getDistance(
      {
        latitude: departureCity.geonames[0].lat,
        longitude: departureCity.geonames[0].lng,
      },
      {
        latitude: destinationCity.geonames[0].lat,
        longitude: destinationCity.geonames[0].lng,
      }
    );

  return (
    departureCity !== null &&
    destinationCity !== null && (
      <div
        className={`list-group-item list-group-item-${
          color ? "warning" : "info"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="box">
          <div className="mx-5">
            <input
              type="checkbox"
              onChange={handleChange}
              checked={!flight.upcoming}
            />
          </div>
          <div>
            <h5>
              <b>Flight Id:</b>
            </h5>
            {flight.id}
          </div>
        </div>
        <div>
          <h5>
            <b>Plane:</b>
          </h5>
          {flight.plane}
        </div>
        <div>
          <h5>
            <b>Departure City:</b>
          </h5>
          {flight.city}
        </div>
        <div>
          <h5>
            <b>Destination City:</b>
          </h5>
          {flight.destination}
        </div>
        <div>
          <h5>
            <b>Weather Forecast:</b>
          </h5>
          <div>
            <Popup trigger={<a href="#">Show</a>} position="right top">
              <div className="wrapper">
                <Forecast
                  label={flight.destination}
                  lat={destinationCity.geonames[0].lat}
                  lon={destinationCity.geonames[0].lng}
                />
              </div>
            </Popup>
          </div>
        </div>
        <div>
          <h5>
            <b>Departure Time:</b>
          </h5>
          {flight.departure}
        </div>
        <div>
          <h5>
            <b>Arrival Time:</b>
          </h5>
          {flight.arrival}
        </div>
        <div>
          <h5>
            <b>Duration:</b>
          </h5>
          {format(flight.duration)}
        </div>
        <div>
          <h5>
            <b>Distance:</b>
          </h5>
          {convertDistance(distance, "km").toFixed(0)} km
        </div>
        {isShown && (
          <button onClick={handleRemove} className="btn btn-danger">
            Delete
          </button>
        )}
      </div>
    )
  );
};

export default Button;
