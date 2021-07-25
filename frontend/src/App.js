import React from "react";
import "./App.css";
import Card from "./Card";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Flights from "./Flights";
import Longest from "./Longest";
import Total from "./Total";
import Add from "./Add";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Charts from "./Charts";
import Login from "./Login";
import Message from "./Message";
import Register from "./Register";
import Account from "./Account";
import Question from "./Question";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Helmet>
              <title>Login</title>
            </Helmet>
            <Login />
          </Route>
          <Route exact path="/home">
            <Helmet>
              <title>My Flightlog</title>
            </Helmet>
            <Card />
          </Route>
          <Route exact path="/flights">
            <Helmet>
              <title>Flights</title>
            </Helmet>
            <Flights />
          </Route>
          <Route exact path="/add">
            <Helmet>
              <title>Add New Flight</title>
            </Helmet>
            <Add />
          </Route>
          <Route exact path="/longest">
            <Helmet>
              <title>Longest Flight</title>
            </Helmet>
            <Longest />
          </Route>
          <Route exact path="/total">
            <Helmet>
              <title>Total Flight Time</title>
            </Helmet>
            <Total />
          </Route>
          <Route exact path="/charts">
            <Helmet>
              <title>Charts</title>
            </Helmet>
            <Charts />
          </Route>
          <Route exact path="/register">
            <Helmet>
              <title>Register</title>
            </Helmet>
            <Register />
          </Route>
          <Route exact path="/message/:status">
            <Helmet>
              <title>Status</title>
            </Helmet>
            <Message />
          </Route>
          <Route exact path="/account">
            <Helmet>
              <title>Account</title>
            </Helmet>
            <Account />
          </Route>
          <Route exact path="/confirm/:operation">
            <Helmet>
              <title>Confirm</title>
            </Helmet>
            <Question />
          </Route>
        </Switch>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
