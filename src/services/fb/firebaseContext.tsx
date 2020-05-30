import React from "react";

const intialState = {};

const FirebaseContext = React.createContext(intialState);

export const withFirebase = (Component: any) => (props: any) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase}></Component>}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
