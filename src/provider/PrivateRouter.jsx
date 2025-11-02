import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if(loading) {
    return <p>loading....</p>
  }

  if(user) {
    return children
  }
  else {
    return <Navigate to="/login"></Navigate>
  }
};

export default PrivateRouter;
