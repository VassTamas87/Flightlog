import React, { useEffect, useState } from "react";
import pilot from "./images/pilot.jpg";
import { Link } from "react-router-dom";
import Message from "./Message";
import axios from "axios";
import Plane from "./Plane";

const userId = localStorage.getItem("user");
const token = localStorage.getItem("token");

const Card = () => {
  const [username, setUsername] = useState("");
  const [hasImage, setHasImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/users/current", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response);
        setUsername(response.data.username);
        localStorage.setItem("user", response.data.id);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        await new Promise((x) => setTimeout(x, 100));
        const response = await axios.get(`/api/picture/${userId}`);
        console.log(response);
        setHasImage(true);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setHasImage(false);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return !token ? (
    <Message prop={"denied"} />
  ) : isLoading ? (
    <Plane />
  ) : (
    <div className="card">
      <div className="card-body">
        <div>
          <h5 className="card-title">My Flightlog</h5>
          <p className="card-text"></p>
          <Link to={"/flights"}>
            <button href="#" className="btn btn-primary">
              Manage My Flights
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
              Longest Flight
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
          <img
            className="profile-pic"
            src={!hasImage ? pilot : `/api/picture/${userId}`}
            alt=""
          />
          <h1 className="mt-2">{username}</h1>
          <h6>Senior First Officer/ Co- Pilot</h6>
          <Link to={"/account"}>Account Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
