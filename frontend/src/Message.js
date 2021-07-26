import React from "react";
import { Link, useParams } from "react-router-dom";

const Message = ({ prop }) => {
  const { status } = useParams();

  if (status === "logout" || status === "delete" || status === "changed") {
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
                : status === "upload"
                ? "Picture has been successfully uploaded."
                : status === "deletepic"
                ? "Picture has been successfully deleted."
                : status === "changed"
                ? "Changed successfully, log back again with the new data."
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
                : status === "upload" || status === "deletepic"
                ? "/account"
                : "/"
            }
          >
            <button className="btn btn-primary">
              {prop === "nodata"
                ? "Back"
                : status === "exists" ||
                  status === "upload" ||
                  status === "deletepic"
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
