import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Message from "./Message";
import Back from "./Back";

const Account = () => {
  const token = localStorage.getItem("token");

  return !token ? (
    <Message prop={"denied"} />
  ) : (
    <div className="card">
      <div className="card-body">
        <div>
          <h5 className="card-title">Account</h5>
          <p className="card-text"></p>
          <Link to={"/flights"}>
            <button href="#" className="btn btn-primary">
              Change Username
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/add"}>
            <button href="#" className="btn btn-primary">
              Change Password
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/longest"}>
            <button href="#" className="btn btn-primary">
              Change Profile Picture
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/longest"}>
            <button href="#" className="btn btn-primary">
              Change Your Rank
            </button>
          </Link>
          <p className="card-text"></p>
          <Link to={"/confirm/delete"}>
            <button href="#" className="btn btn-primary">
              Delete Your Account
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
