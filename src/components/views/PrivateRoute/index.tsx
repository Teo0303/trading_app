import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute: React.FC<any> = ({
  Component,
  authUser,
  ...rest
}) => {
  console.log(authUser);

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          authUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/" }}></Redirect>
          )
        }
      />
    </div>
  );
};
