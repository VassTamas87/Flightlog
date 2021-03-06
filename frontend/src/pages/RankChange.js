import React from "react";
import { Form, Formik } from "formik";
import { RankSchema } from "../components/forms/Schemas";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Ranks from "../components/select/Ranks";
import Field from "../components/forms/Field";
import BackLink from "../components/buttons/BackLink";
import Message from "../pages/Message";

const RankChange = () => {
  const history = useHistory();
  const userId = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const onResgistration = async ({ position }) => {
    try {
      const resp = await axios.put(
        `/api/users/${userId}?position=${position}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(resp);
      history.push("/message/rank");
    } catch (error) {
      console.log(error);
    }
  };

  return !token ? (
    <Message prop={"denied"} />
  ) : (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <h1>Change Rank</h1>
            <Formik
              initialValues={{
                position: "",
              }}
              validationSchema={RankSchema}
              onSubmit={onResgistration}
            >
              <Form>
                <Field name="position" component="select" className="mb-3">
                  <Ranks />
                </Field>
                <button className="btn btn-primary w-100 mt-3" type="submit">
                  Change
                </button>
                <BackLink prop={"account"} />
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankChange;
