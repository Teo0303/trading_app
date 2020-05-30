import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../../../services/fb";

const withAuthorization = (condition: any) => (Component: any) => {
  //
  const WithAuthorization: React.FC<any> = (props) => {
    let history = useHistory();

    useEffect(() => {
      const listener = props.firebase.auth.onAuthStateChanged(
        (authUser: any) => {
          if (!condition(authUser)) {
            history.push({ pathname: "/" });
          }
        }
      );

      return () => {
        listener();
      };
    });

    return <Component {...props}></Component>;
  };

  return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
