import React from "react";

const Planes = () => {
  const planesArray = [
    "-",
    "Airbus A319-100",
    "Airbus A320-200",
    "Airbus A320neo",
    "Airbus A321-100",
    "Airbus A321-200",
    "Airbus A321neo",
    "Airbus A330-300",
    "Airbus A340-300",
    "Airbus A340-600",
    "Airbus A350-900",
    "Boeing 747-400",
    "Boeing 747-800",
  ];

  return planesArray.map((plane) => (
    <option key={plane} value={plane}>
      {plane}
    </option>
  ));
};

export default Planes;
