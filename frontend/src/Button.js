import React, { useState } from "react";

const Button = ({ flight, remove }) => {
  const handleRemove = () => remove(flight);
  const handleMouseEnter = () => setIsShown(true);
  const handleMouseLeave = () => setIsShown(false);
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      className="list-group-item list-group-item-info"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <h5>
          <b>Flight Id:</b>
        </h5>
        {flight.id}
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
      {isShown && (
        <button onClick={handleRemove} className="btn btn-danger">
          Delete
        </button>
      )}
    </div>
  );
};

export default Button;
