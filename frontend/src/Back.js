import { Link } from "react-router-dom";
import React from "react";

const Back = () => {
  return (
    <Link to={"/home"}>
      <button className="btn btn-primary">Back</button>
    </Link>
  );
};

export default Back;
