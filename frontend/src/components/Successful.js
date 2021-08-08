import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Plane from "../assets/Plane";

const Successful = ({ setSuccess }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await new Promise((x) => setTimeout(x, 3000));
      setLoading(false);
    }
    fetchData();
  }, []);

  return loading ? (
    <Plane />
  ) : (
    <>
      <div className="card">
        <div className="card-body">
          <div>
            <h2 className="card-text">
              <b>Flight saved successfully.</b>
            </h2>
          </div>
          <Link to={"/add"}>
            <button
              onClick={() => setSuccess(false)}
              className="btn btn-primary"
            >
              Back
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Successful;
