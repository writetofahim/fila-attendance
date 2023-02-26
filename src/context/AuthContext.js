import jwt_decode from "jwt-decode";
import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const [userLoading, setUserLoading] = useState(true);
  useEffect(() => {
    setUserLoading(true);
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      try {
        const decoded = jwt_decode(token);
        console.log(decoded);
        dispatch({ type: "LOGIN", payload: user });
      } catch (error) {
        console.log("Error decoding token:", error);
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("accessToken");
      }
    } else {
      dispatch({ type: "LOGOUT" });
    }
    setUserLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, userLoading, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
