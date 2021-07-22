import React, { useState, useEffect } from "react";
import axios from "axios";
import Back from "./Back";
import moment from "moment";
import Message from "./Message";
import { useHistory } from "react-router-dom";

const format = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm");
};

const Longest = () => {
  const [longest, setLongest] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/longest", {
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
  }, []);

  return !longest?.id ? (
    <Message prop={"nodata"} />
  ) : (
    <div>
      <div className="list-group-item list-group-item-info">
        <div>
          <h5>
            <b>Flight Id:</b>
          </h5>
          {longest.id}
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
      </div>
      <Back />
    </div>
  );
};

export default Longest;
