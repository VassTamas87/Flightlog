import React, { useState, useEffect } from "react";
import axios from "axios";
import Back from "../components/buttons/Back";
import moment from "moment";
import Message from "./Message";
import { useHistory } from "react-router-dom";
import FlightsTitle from "../components/FlightsTitle";
import duration from "moment-duration-format";

const format = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm");
};

const millFormat = (date) => {
  return moment.duration(date, "milliseconds").format("hh:mm", { trim: false });
};

const Longest = () => {
  const [longest, setLongest] = useState(null);
  const history = useHistory();
  const userId = localStorage.getItem("user");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/flights/longest/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setLongest(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
        history.push("/message/noaccess");
      }
    }
    fetchData();
  }, [history, userId]);

  return !longest?.id ? (
    <Message prop={"nodata"} />
  ) : (
    <div>
      <FlightsTitle prop={"longest"} />
      <div className="flights list-group-item list-group-item-info">
        <div>
          <h5>
            <b>Flight Id:</b>
          </h5>
          {longest.id}
        </div>
        <div>
          <h5>
            <b>Plane:</b>
          </h5>
          {longest.plane}
        </div>
        <div>
          <h5>
            <b>Departure City:</b>
          </h5>
          {longest.city}
        </div>
        <div>
          <h5>
            <b>Destination City:</b>
          </h5>
          {longest.destination}
        </div>
        <div>
          <h5>
            <b>Departure Time:</b>
          </h5>
          {format(longest.departure)}
        </div>
        <div>
          <h5>
            <b>Arrival Time:</b>
          </h5>
          {format(longest.arrival)}
        </div>
        <div>
          <h5>
            <b>Duration:</b>
          </h5>
          {millFormat(longest.duration)}
        </div>
      </div>
      <Back />
    </div>
  );
};

export default Longest;
