import React, { createContext, useReducer } from "react";
import { AuthReducer, InitialAuthState } from "../reducers/AuthReducer";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(AuthReducer, InitialAuthState);

  return (
    <GlobalContext.Provider value={{ authState, authDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider, GlobalContext };
