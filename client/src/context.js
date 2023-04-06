import axios from "axios";
import React, { useState, useContext, useEffect, useCallback } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [session, setSession] = useState(false);
  const [dataSession, setDataSession] = useState("");
  const Validation = useCallback(async () => {
    const token = await axios.get("http://localhost:5000/validateJWT", {
      withCredentials: true,
    });
    if (token.data.decodedToken) {
      setDataSession(token.data.decodedToken);
      return setSession(true);
    }
  }, []);

  useEffect(() => {
    Validation();
  }, [Validation, session]);

  return (
    <AppContext.Provider
      value={{ session, setSession, dataSession, setDataSession }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
