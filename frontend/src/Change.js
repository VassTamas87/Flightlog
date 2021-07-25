import React from "react";
import { Form, Formik } from "formik";
import MyTextField from "./MyTextField";
import ChangeSchema from "./ChangeSchema";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.div`
  text-align: right;
  float: right;
`;

const Change = () => {
  const userId = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const history = useHistory();

  const onResgistration = async ({
    username,
    usernameconf,
    password,
    passwconf,
  }) => {
    try {
      const resp = await axios.put(
        `/api/users/${userId}?${
          username.length > 0 && password.length > 0
            ? "username=" + username + "&password=" + password
            : username.length > 0 && password.length === 0
            ? "username=" + username
            : "&password=" + password
        }`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(resp);
      history.push("/message/changed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <h1>Change Username And Password</h1>
            <Formik
              initialValues={{
                username: "",
                usernameconf: "",
                password: "",
                passwconf: "",
              }}
              validationSchema={ChangeSchema}
              onSubmit={onResgistration}
            >
              {({ resetForm, values }) => (
                <Form>
                  <MyTextField name="username" type="text" label="Username" />
                  <MyTextField
                    name="usernameconf"
                    type="text"
                    label="Confirm Username"
                  />
                  <MyTextField name="password" type="text" label="Password" />
                  <MyTextField
                    name="passwconf"
                    type="text"
                    label="Confirm Password"
                  />
                  {((values.username.length > 0 &&
                    values.usernameconf.length > 0) ||
                    (values.password.length > 0 &&
                      values.passwconf.length > 0)) && (
                    <button className="btn btn-primary w-100" type="submit">
                      Change
                    </button>
                  )}
                  <StyledDiv className="mt-2 mx-2">
                    <Link to={"/account"}>Bact To Account</Link>
                  </StyledDiv>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Change;