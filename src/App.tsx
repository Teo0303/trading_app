import React from "react";
import "./App.css";

import { LoginPage, Home } from "./components/views";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from "./components/views/PrivateRoute";
import { withAuthentication } from "./components/views/Session";

function App(props: any) {
  return (
    <Router>
      <PrivateRoute exact path='/' component={Home}></PrivateRoute>
      <Route exact path='/login' component={LoginPage}></Route>
    </Router>
  );
}

export default withAuthentication(App);
