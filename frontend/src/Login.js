import React from "react";
import { Form, Formik } from "formik";
import MyTextField from "./MyTextField";
import LoginSchema from "./LoginSchema";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const onResgistration = async ({ username, password }) => {
    try {
      const resp = await axios.post("/api/login", {
        username,
        password,
      });
      console.log(resp);
      localStorage.setItem("token", resp.data.token);
      history.push("/home");
    } catch (error) {
      console.log(error);
      history.push("/message/invalid");
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <h1>Login</h1>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={onResgistration}
            >
              <Form>
                <MyTextField name="username" type="text" label="Username" />
                <MyTextField name="password" type="password" label="Password" />
                <button className="btn btn-primary w-100" type="submit">
                  Login
                </button>
                <div className="mt-2 mx-2">
                  Don't have an account? <Link to={"/register"}>Register</Link>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
