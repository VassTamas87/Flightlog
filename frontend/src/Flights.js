import React, { useState, useEffect } from "react";
import axios from "axios";
import Back from "./Back";
import moment from "moment";
import Button from "./Button";
import Message from "./Message";
import { useHistory } from "react-router-dom";

const format = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm");
};

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const history = useHistory();

  const remove = async (flight) => {
    try {
      await axios.delete(`/api/delete/${flight.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setFlights(flights.filter((el) => el.id !== flight.id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/flights", {
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
  }, []);

  return flights.length < 1 ? (
    <Message prop={"nodata"} />
  ) : (
    <div>
      {flights.map((flight) => (
        <Button flight={flight} remove={remove} key={flight.id} />
      ))}
      <Back />
    </div>
  );
};

export default Flights;
