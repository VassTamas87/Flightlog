import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.div`
  text-align: right;
  float: right;
`;

const BackLink = ({ prop }) => {
  return (
    <StyledDiv className="mt-2 mx-2">
      <Link to={prop === "account" ? "/account" : "/"}>
        {prop === "account" ? "Bact To Account" : "Back to login"}
      </Link>
    </StyledDiv>
  );
};

export default BackLink;
