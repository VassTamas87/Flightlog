import React from "react";
import { Link } from "react-router-dom";
import Message from "../pages/Message";
import Back from "../components/buttons/Back";

const Account = () => {
  const token = localStorage.getItem("token");

  return !token ? (
    <Message prop={"denied"} />
  ) : (
    <div className="card">
      <div className="card-body">
        <div>
          <h5 className="card-title">Account Settings</h5>
          <p className="card-text"></p>
          <Link to={"/confirm/unpw"}>
            <button href="#" className="btn btn-primary">
              Change Username/Password
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/rank"}>
            <button href="#" className="btn btn-primary">
              Change Rank
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/upload"}>
            <button href="#" className="btn btn-primary">
              Change Profile Picture
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/confirm/delete"}>
            <button href="#" className="btn btn-primary">
              Delete Your Account
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/message/logout"}>
            <button href="#" className="btn btn-primary">
              Logout
            </button>
          </Link>
          <p className="card-text"></p>
          <Back />
        </div>
      </div>
    </div>
  );
};

export default Account;
