import React, { useState } from "react";
import { Form, Formik } from "formik";
import MyTextField from "../components/forms/MyTextField";
import { AddSchema } from "../components/forms/Schemas";
import axios from "axios";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import "moment/locale/en-gb";
import Successful from "../components/Successful";
import Back from "../components/buttons/Back";
import { useHistory } from "react-router-dom";
import Message from "./Message";
import Field from "../components/forms/Field";
import Planes from "../components/select/Planes";

const format = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm");
};

const isValidArrival = (arrival, departure) => {
  return arrival > departure;
};

const Add = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user");

  const onResgistration = async ({ city, destination, plane }) => {
    try {
      const resp = await axios.post(
        `/api/flights/save/${userId}`,
        {
          city,
          destination,
          departure,
          arrival,
          plane,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(resp);
    } catch (error) {
      console.log(error);
      history.push("/message/noaccess");
    }
  };

  return !token ? (
    <Message prop={"denied"} />
  ) : success ? (
    <Successful setSuccess={setSuccess} />
  ) : (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="top">
              <h1>Add Flight</h1>
              <Back />
            </div>
            <Formik
              initialValues={{
                city: "",
                destination: "",
                plane: "",
              }}
              validationSchema={AddSchema}
              onSubmit={onResgistration}
            >
              {({ resetForm, values }) => (
                <Form>
                  <MyTextField name="city" type="text" label="Departure City" />
                  <MyTextField
                    name="destination"
                    type="text"
                    label="Destination City"
                  />
                  <label className="mb-2">Departure Time</label>
                  <Datetime
                    className="mb-3"
                    dateFormat="YYYY-MM-DD"
                    locale="en-gb"
                    value={departure}
                    onChange={(e) => setDeparture(format(e))}
                  />
                  <label className="mb-2">
                    Arrival Time (arrival time must be later than departure
                    time)
                  </label>
                  <Datetime
                    dateFormat="YYYY-MM-DD"
                    locale="en-gb"
                    value={arrival}
                    onChange={(e) => setArrival(format(e))}
                  />
                  <label className="mt-3">Plane</label>
                  <Field name="plane" component="select">
                    <Planes />
                  </Field>
                  {values.city.length > 0 &&
                    values.destination.length > 0 &&
                    departure.length > 0 &&
                    arrival.length > 0 &&
                    isValidArrival(arrival, departure) &&
                    values.plane.length > 1 && (
                      <button
                        onClick={() =>
                          setTimeout(() => {
                            setDeparture("");
                            setArrival("");
                            resetForm();
                            setSuccess(true);
                          }, 100)
                        }
                        className="btn btn-primary w-100 mt-4"
                        type="submit"
                      >
                        Save Flight
                      </button>
                    )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
