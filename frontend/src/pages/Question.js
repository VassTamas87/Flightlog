import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Change from "./Change";
import Message from "../pages/Message";

const Question = () => {
  const { operation } = useParams();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");
  const history = useHistory();

  const deleteAccount = async () => {
    try {
      await axios.delete(`/api/users/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      history.push("/message/delete");
    } catch (err) {
      console.log(err);
    }
  };

  return !token ? (
    <Message prop={"denied"} />
  ) : operation !== "delete" ? (
    <Change />
  ) : (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="card-text">
            <b>Are you sure you want to delete your account?</b>
          </h2>
          <button className="btn btn-primary" onClick={deleteAccount}>
            Yes
          </button>
          <Link to={"/account"}>
            <button className="btn btn-primary">No</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Question;
