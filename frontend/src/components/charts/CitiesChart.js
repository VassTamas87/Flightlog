import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Message from "../../pages/Message";
import ChartsBackButton from "./ChartsBackButton";

const CitiesChart = (props) => {
  return props.cities.length < 1 ? (
    <Message prop={"nodata"} />
  ) : (
    <div className="card w-50">
      <div className="card-body">
        <div id="outer">
          <h1>Cities Visited</h1>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            barCategoryGap="20%"
            width={600}
            height={300}
            data={props.cities}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis width={80} type="category" dataKey="city" interval={0} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Total Visits" />
          </BarChart>
        </ResponsiveContainer>
        <ChartsBackButton {...props} />
      </div>
    </div>
  );
};

export default CitiesChart;
