import React, { useState, useEffect } from "react";
import axios from "axios";
import CitiesChart from "./CitiesChart";
import HoursChart from "./HoursChart";
import { useHistory } from "react-router-dom";

const Charts = () => {
  const [cities, setCities] = useState([]);
  const [flights, setFlights] = useState([]);
  const [barChart, setBarChart] = useState(true);
  const [lineChart, setLineChart] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/cities", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const sorted = response.data.sort((a, b) => b.count - a.count);
        setCities(sorted);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        history.push("/message/noaccess");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/flights", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const sorted = response.data.sort(function (a, b) {
          return new Date(a.departure) - new Date(b.departure);
        });
        setFlights(sorted);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        history.push("/message/noaccess");
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {barChart && (
        <CitiesChart
          cities={cities}
          setBarChart={setBarChart}
          setLineChart={setLineChart}
          barChart={barChart}
          lineChart={lineChart}
        />
      )}
      {lineChart && (
        <HoursChart
          flights={flights}
          setBarChart={setBarChart}
          setLineChart={setLineChart}
          barChart={barChart}
          lineChart={lineChart}
        />
      )}
    </>
  );
};

export default Charts;
