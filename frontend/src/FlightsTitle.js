import React from "react";
import styled from "styled-components";

const StyledH1 = styled.h1`
  width: 100%;
  text-align: center;
`;

const FlightsTitle = ({ prop }) => {
  return (
    <div className="list-group-item list-group-item-light">
      <StyledH1>
        {prop === "longest"
          ? "Longest Flight With The Earliest Departure"
          : prop === "past"
          ? "Past Flights"
          : "Upcoming Flights"}
      </StyledH1>
    </div>
  );
};

export default FlightsTitle;
