import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthServices";

const PrivateRoute = ({ children }) => {
  let { userData, checkToken, logOut, setUserData } = useContext(AuthContext);
  useEffect(() => {
    if (userData && !checkToken(userData.exp)) {
      setUserData(null);
      logOut();
    }
  }, [setUserData,logOut]);

  return (
    <>{localStorage.getItem("token") ? children : <Navigate to="/login" />}</>
  );
};

export default PrivateRoute;
