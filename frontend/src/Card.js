import React from "react";
import pilot from "./images/pilot.jpg";
import { Link } from "react-router-dom";
import Message from "./Message";

const Card = () => {
  const token = localStorage.getItem("token");

  return !token ? (
    <Message prop={"denied"} />
  ) : (
    <div className="card">
      <div className="card-body">
        <div>
          <h5 className="card-title">My Flightlog</h5>
          <p className="card-text"></p>
          <Link to={"/flights"}>
            <button href="#" className="btn btn-primary">
              List All My Flights
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/add"}>
            <button href="#" className="btn btn-primary">
              Add Flights
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/longest"}>
            <button href="#" className="btn btn-primary">
              Show The Longest Flight
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/total"}>
            <button href="#" className="btn btn-primary">
              Total Flight Time
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/charts"}>
            <button href="#" className="btn btn-primary">
              Flight Charts
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/message/logout"}>
            <button href="#" className="btn btn-primary">
              Logout
            </button>
          </Link>
        </div>
        <div>
          <img src={pilot} alt="" height="75%" />
          <h1 className="mt-2">John Doe</h1>
          <h6>Senior First Officer/ Co- Pilot</h6>
        </div>
      </div>
    </div>
  );
};

export default Card;
