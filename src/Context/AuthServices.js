import { createContext, useCallback, useEffect, useState } from "react";
import api from "../Helpers/HandleAuthentication";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export let AuthContext = createContext({});

export default function AuthServicesProvider(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");

  //#region Login
  const login = async (data) => {
    const response = await api.post("/account/login", data);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);

      saveUserData();
      navigate("/");
    }
  };

  const saveUserData = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token.toString());
      if (checkToken(decodedToken.exp)) {
        setUserData(decodedToken);
      } else {
        localStorage.removeItem("token");
        setUserData(null);
      }
    }
  }, []);

  const checkToken = (exp) => {
    return Date.now() < exp * 1000;
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, [saveUserData]);
  // useEffect(() => {
  //   setUserData();
  // }, [setUserData]);

  //#endregion Login

  //#region LogOut

  const logOut = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };
  //#endregion LogOut

  return (
    <AuthContext.Provider value={{ login, logOut, userData, checkToken,setUserData }}>
      {props.children}
    </AuthContext.Provider>
  );
}
