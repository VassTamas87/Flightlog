import "./App.css";
import React from "react";
import { Form, Formik } from "formik";
import MyTextField from "./MyTextField";
import RegisterSchema from "./RegisterSchema";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const onResgistration = async ({ username, password, passwconf }) => {
    try {
      const resp = await axios.post("/api/users", {
        username,
        password,
        passwconf,
      });
      console.log(resp);
      history.push("/message/registered");
    } catch (error) {
      console.log(error);
      history.push("/message/exists");
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <h1>Register</h1>
            <Formik
              initialValues={{
                username: "",
                password: "",
                passwconf: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={onResgistration}
            >
              <Form>
                <MyTextField name="username" type="text" label="Username" />
                <MyTextField name="password" type="password" label="Password" />
                <MyTextField
                  name="passwconf"
                  type="password"
                  label="Confirm Password"
                />
                <button className="btn btn-primary w-100" type="submit">
                  Register
                </button>
                <div className="mt-2 mx-2">
                  <Link to={"/"}>Bact To Login</Link>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
