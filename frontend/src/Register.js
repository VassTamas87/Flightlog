import React from "react";
import { Form, Formik } from "formik";
import MyTextField from "./MyTextField";
import { RegisterSchema } from "./Schemas";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Ranks from "./Ranks";
import Field from "./Field";
import BackLink from "./BackLink";

const Register = () => {
  const history = useHistory();

  const onResgistration = async ({
    username,
    password,
    passwconf,
    position,
  }) => {
    try {
      const resp = await axios.post("/api/users", {
        username,
        password,
        passwconf,
        position,
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
                position: "",
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
                <Field
                  name="position"
                  component="select"
                  className="mb-3"
                  label="Rank"
                >
                  <Ranks />
                </Field>
                <button className="btn btn-primary w-100 mt-3" type="submit">
                  Register
                </button>
                <BackLink />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
