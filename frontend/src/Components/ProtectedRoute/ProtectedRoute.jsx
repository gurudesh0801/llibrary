// ProtectedRoute.js
import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useUserAuth } from "../contexts/authContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useUserAuth();
  const navigate = useNavigate();

  console.log(isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : navigate("/login")
      }
    />
  );
};

export default ProtectedRoute;
