import React, { useState, useEffect } from "react";
import axios from "axios";
import Back from "./Back";
import moment from "moment";
import Button from "./Button";
import Message from "./Message";
import { useHistory } from "react-router-dom";
import FlightsTitle from "./FlightsTitle";

const format = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm");
};

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [upcomings, setUpcomings] = useState([]);
  const history = useHistory();
  const userId = localStorage.getItem("user");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/flights/listall/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const mappedResult = response.data.map((el) => {
          return {
            ...el,
            departure: format(el.departure),
            arrival: format(el.arrival),
          };
        });
        setFlights(mappedResult);
        console.log(response);
      } catch (error) {
        console.error(error);
        history.push("/message/noaccess");
      }
    }
    fetchData();
  }, [history, userId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/flights/upcomings/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const mappedResult = response.data.map((el) => {
          return {
            ...el,
            departure: format(el.departure),
            arrival: format(el.arrival),
          };
        });
        const sorted = mappedResult.sort(function (a, b) {
          return new Date(a.departure) - new Date(b.departure);
        });
        setUpcomings(sorted);
        console.log(response);
      } catch (error) {
        console.error(error);
        history.push("/message/noaccess");
      }
    }
    fetchData();
  }, [history, userId]);

  const updateStatus = async (flight) => {
    try {
      await axios.put(
        `/api/flights/update/${flight.id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (flight.upcoming) {
        setUpcomings(upcomings.filter((el) => el.id !== flight.id));
        const newFlights = [...flights, { ...flight, upcoming: false }];
        const sorted = newFlights.sort((a, b) => a.id - b.id);
        setFlights(sorted);
      } else {
        setFlights(flights.filter((el) => el.id !== flight.id));
        const newUpcomings = [...upcomings, { ...flight, upcoming: true }];
        const sorted = newUpcomings.sort(function (a, b) {
          return new Date(a.departure) - new Date(b.departure);
        });
        setUpcomings(sorted);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (flight) => {
    try {
      await axios.delete(`/api/flights/delete/${flight.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (flight.upcoming) {
        setUpcomings(upcomings.filter((el) => el.id !== flight.id));
      } else {
        setFlights(flights.filter((el) => el.id !== flight.id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return flights.length < 1 && upcomings.length < 1 ? (
    <Message prop={"nodata"} />
  ) : (
    <div>
      {flights.length > 0 && <FlightsTitle prop={"past"} />}
      {flights.map((flight) => (
        <Button
          flight={flight}
          remove={remove}
          updateStatus={updateStatus}
          key={flight.id}
        />
      ))}
      {upcomings.length > 0 && <FlightsTitle />}
      {upcomings.map((flight) => (
        <Button
          flight={flight}
          remove={remove}
          color={"color"}
          key={flight.id}
          updateStatus={updateStatus}
        />
      ))}
      <Back />
    </div>
  );
};

export default Flights;
