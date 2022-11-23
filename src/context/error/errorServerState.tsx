import React, { useState, useReducer } from "react";
import {errorServerContext} from './errorServerContext'
import employeeReducer from './errorServerReducer'
import {UPDATE_ERROR} from './errorServerType'

interface props {
  children: JSX.Element | JSX.Element[];
}

const initialState ={
  errorFromServer: false,
};

const ErrorServerProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  function saveErrorFromServerFn(errorFromServer:boolean) : void {
    dispatch({
      type: UPDATE_ERROR,
      errorFromServer: errorFromServer
    })
  }

  return (
    <errorServerContext.Provider
      value={{
        errorFromServer : state.errorFromServer,
        saveErrorFromServerFn,
      }}
    >
      {children}
    </errorServerContext.Provider>
  );
};

export default ErrorServerProvider;
