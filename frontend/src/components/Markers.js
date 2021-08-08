import { Marker, Popup, Polyline } from "react-leaflet";
import PlaneIcon from "../assets/PlaneIcon";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MarkerWithPopup({ route }) {
  const [departureCity, setDepartureCity] = useState(null);
  const [destinationCity, setDestinationCity] = useState(null);
  const depLat = departureCity?.geonames[0]?.lat;
  const depLng = departureCity?.geonames[0]?.lng;
  const desLat = destinationCity?.geonames[0]?.lat;
  const desLng = destinationCity?.geonames[0]?.lng;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://api.geonames.org/searchJSON?q=${route.city}&maxRows=1&username=VassTamas87`
        );
        console.log(response);
        setDepartureCity(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [route.city]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://api.geonames.org/searchJSON?q=${route.destination}&maxRows=1&username=VassTamas87`
        );
        console.log(response);
        setDestinationCity(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [route.destination]);

  return (
    departureCity !== null &&
    destinationCity !== null && (
      <>
        <Marker position={[depLat, depLng]} icon={PlaneIcon}>
          <Popup>{route.city}</Popup>
        </Marker>
        <Marker position={[desLat, desLng]} icon={PlaneIcon}>
          <Popup>{route.destination}</Popup>
        </Marker>
        <Polyline
          positions={[
            [depLat, depLng],
            [desLat, desLng],
          ]}
        />
      </>
    )
  );
}
