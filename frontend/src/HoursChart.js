import React from "react";
import {
  Line,
  LineChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Message from "./Message";
import moment from "moment";
import ChartsBackButton from "./ChartsBackButton";

const format = (date) => {
  return moment(date).format("YY-MM-DD");
};

const formatMills = (date) => {
  return (date / 1000 / 3600).toFixed(0);
};

const HoursChart = (props) => {
  return props.flights.length < 1 ? (
    <Message prop={"nodata"} />
  ) : (
    <div className="card w-50">
      <div className="card-body">
        <div id="outer">
          <h1>Flight Hours</h1>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={500}
            height={300}
            data={props.flights}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="departure" tickFormatter={format} />
            <YAxis tickFormatter={formatMills} />
            <Tooltip formatter={formatMills} labelFormatter={format} />
            <Legend />
            <Line
              type="monotone"
              dataKey="duration"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Hours Flown"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
        <ChartsBackButton {...props} />
      </div>
    </div>
  );
};

export default HoursChart;
