import { Link } from "react-router-dom";
import React from "react";

const ChartsBackButton = (props) => {
  const handleCharts = () => {
    props.setLineChart(!props.lineChart);
    props.setBarChart(!props.barChart);
  };

  return (
    <div className="buttons-toolbar">
      <div className="left-group">
        <Link to={"/home"}>
          <button className="btn btn-primary">Back</button>
        </Link>
      </div>
      <div className="right-group">
        <button className="btn btn-primary" onClick={handleCharts}>
          Change Chart
        </button>
      </div>
    </div>
  );
};

export default ChartsBackButton;
