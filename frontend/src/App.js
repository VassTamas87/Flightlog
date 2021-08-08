import React from "react";
import Card from "./pages/Card";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Flights from "./pages/Flights";
import Longest from "./pages/Longest";
import Total from "./pages/Total";
import Add from "./pages/Add";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Charts from "./pages/Charts";
import Login from "./pages/Login";
import Message from "./pages/Message";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Question from "./pages/Question";
import Upload from "./pages/Upload";
import RankChange from "./pages/RankChange";
import Map from "./pages/Map";

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
          <Route exact path="/upload">
            <Helmet>
              <title>Upload</title>
            </Helmet>
            <Upload />
          </Route>
          <Route exact path="/rank">
            <Helmet>
              <title>Rank</title>
            </Helmet>
            <RankChange />
          </Route>
          <Route exact path="/map">
            <Helmet>
              <title>Map</title>
            </Helmet>
            <Map />
          </Route>
        </Switch>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
