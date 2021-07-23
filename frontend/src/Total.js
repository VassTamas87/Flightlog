import React, { useState, useEffect } from "react";
import axios from "axios";
import Back from "./Back";
import { useHistory } from "react-router-dom";

const Total = () => {
  const [total, setTotal] = useState();
  const history = useHistory();
  const userId = localStorage.getItem("user");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/flights/total/${userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setTotal(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
        history.push("/message/noaccess");
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div>
            {total !== null && (
              <h2 className="card-text">
                <b>You flew a total of {total} hours.</b>
              </h2>
            )}
          </div>
          <Back />
        </div>
      </div>
    </>
  );
};

export default Total;
