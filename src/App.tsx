import React, { useState, useEffect } from "react";
import "./App.css";

import { LoginPage, Home } from "./components/views";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withFirebase } from "./services/fb";
import { PrivateRoute } from "./components/views/PrivateRoute";

// import TableOfUsers from "./components/TableOfUsers";
interface AuthUser {
  email: string;
}

function App(props: any) {
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    props.firebase.auth.onAuthStateChanged((authUser: AuthUser) => {
      console.log(authUser.email);
      authUser ? setCurrentUser(authUser) : setCurrentUser(null);
    });
  }, []);

  return (
    <Router>
      <PrivateRoute
        exact
        path='/'
        component={Home}
        authUser={currentUser}
      ></PrivateRoute>
      <Route exact path='/login' component={LoginPage}></Route>
    </Router>
  );
}

export default withFirebase(App);
