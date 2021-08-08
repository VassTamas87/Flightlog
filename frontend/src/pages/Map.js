import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Back from "../components/buttons/Back";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Markers from "../components/Markers";

const Map = () => {
  const position = [48.1, 20.78333];
  const userId = localStorage.getItem("user");
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/flights/maproutes/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setRoutes(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <div className="m-3">
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "90vh", width: "100wh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {routes.map((route, index) => (
          <Markers route={route} key={index} />
        ))}
      </MapContainer>
      <Back />
    </div>
  );
};

export default Map;
