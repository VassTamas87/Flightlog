import React from "react";
import { Link, useParams } from "react-router-dom";

const Message = ({ prop }) => {
  const { status } = useParams();

  if (status === "logout" || status === "delete") {
    localStorage.clear();
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="card-text">
            <b>
              {status === "logout"
                ? "You have successfully logged out."
                : status === "invalid"
                ? "Invalid username or password."
                : status === "noaccess" || prop === "denied"
                ? "Access Denied!!!"
                : status === "registered"
                ? "You have successfully registered."
                : status === "delete"
                ? "You have successfully deleted your account."
                : status === "exists"
                ? "Username already exists!"
                : prop === "nodata"
                ? "You don't have any flight record."
                : ""}
            </b>
          </h2>
          <Link
            to={
              prop === "nodata"
                ? "/home"
                : status === "exists"
                ? "/register"
                : "/"
            }
          >
            <button className="btn btn-primary">
              {prop === "nodata"
                ? "Back"
                : status === "exists"
                ? "Back"
                : "Back To Login"}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Message;
