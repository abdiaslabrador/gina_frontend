import React, {useContext} from "react";
import { useRouter } from "next/router";
import { createContext, useReducer } from "react";

import customAxios from "../../config/axios";
import authReducer from "./authReducer";
import { authContextInf } from "../../interface/auth";
import { GET_USER, 
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOG_OUT,
  LOGIN_ERROR_SERVER,
} from "./authTypes";
import {authContext} from './authContext';

interface props {
  children: JSX.Element | JSX.Element[];
}

const AuthProvider = ({ children }: props) => {

  const router = useRouter();

  const initialState = {
    user: null,
    message: "",
    authenticated: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const singIn = async (email: string, password: string) => {
    //el token se asigna en el backend
    try {
      const resp = await customAxios.post("/auth/login", {
        email: email,
        password: password,
      });
      dispatch({ type: LOGIN_SUCCESS });
      router.push("/");
    } catch (error: any) {
      console.log(error);
      let message = error.response.data?.msg || error.message;

      dispatch({
        type: LOGIN_ERROR,
        message: message,
      });
    }
  };

  const userAuthenticated = async () => {
    try {
      const resp = await customAxios.get("/auth");
      dispatch({
        type: GET_USER,
        user: resp.data,
      });
    } catch (error: any) {
      console.log(error);
      let message = error.response.data?.msg || error.message;
      if (error.response?.status == "403") {
        //usuario con el token inválido
        //NOTA: ya el token se elimina desde el backend
        dispatch({
          type: LOGIN_ERROR,
          message: message,
        });
        router.push("/login");
      } else {
        dispatch({
          type: LOGIN_ERROR_SERVER,
          message: message,
        });
      }
    }
  };

  const logOut = async () => {
    try {
      await deleteTokenCookie();
      dispatch({
        type: LOG_OUT,
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTokenCookie = async () => {
    try {
      await customAxios.get("/auth/delete-token");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <authContext.Provider
      value={{
        user: state.user,
        message: state.message,
        singIn,
        userAuthenticated,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
