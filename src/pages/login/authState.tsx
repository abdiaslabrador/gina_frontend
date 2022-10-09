import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, createContext, useReducer } from "react";

import LoginInf from "../../interface/auth";
import customAxios from "../../config/axios";
import authToken from "../../config/authToken";
import authReducer from "./authReducer";
import authTypes from "./authTypes";

export const authContext = createContext();

const AuthProvider = (props: any) => {
  const router = useRouter();
  const initialState = {
    authenticated: false,
    user: null,
    token: null,
    mensaje: "",
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  // const getUserStore = () =>{
  //   let user = localStorage.getItem("user")
  //   user ? user =  JSON.parse(user) : user = null

  // }
  const userAuthenticated = async () => {
    let token: string | null = localStorage.getItem("token");
    authToken(token);

    try {
      const resp = await customAxios.get("/api/auth");
      dispatch({
        type: authTypes.GET_USER,
        playload: { token: token, user: resp.data },
      });
    } catch (error: any) {
      console.log(error);
      let message: string = "";

      error.response.data
        ? (message = error.response.data.msg)
        : (message = error.message);
      dispatch({
        type: authTypes.LOGIN_ERROR,
        playload: message,
      });
    }
  };

  const permitLogin = async () => {
    let token: string | null = localStorage.getItem("token");
    authToken(token);

    try {
      const resp = await customAxios.get("/api/auth/permitLogin");
      //todo bien con el token, el usuario inició previamente sesió
      if(resp.data){
        dispatch({
          type: authTypes.GET_USER,
          playload: { token: token, user: resp.data },
        });
      }else{ //se encontro un problema con token o el usuario, dejarlo en la página de login
        dispatch({
          type: authTypes.LOGIN_ERROR,
          playload: "",
        });
      }
    } catch (error: any) {
      console.log(error);
      let message: string = "";
      error.response.data
        ? (message = error.response.data.msg)
        : (message = error.message);
      dispatch({
        type: authTypes.LOGIN_ERROR,
        playload: message,
      });
    }
  };

  const singIn = async (email: string, password: string) => {
    try {
      const resp = await customAxios.post("/api/auth/login", {
        email: email,
        password: password,
      });
      const token = resp.data;
      localStorage.setItem("token", token);

      dispatch({
        type: authTypes.LOGIN_SUCCESS,
        playload: token,
      });

      // userAuthenticated();
      // router.replace("/");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      let message: string = "";
      (error.response.data)
        ? (message = error.response.data.msg)
        : (message = error.message);
      dispatch({
        type: authTypes.LOGIN_ERROR,
        playload: message,
      });
    }
  };

  const logOut = () => {
    dispatch({
      type: authTypes.LOG_OUT,
    });
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        user: state.user,
        mensaje: state.mensaje,
        singIn,
        userAuthenticated,
        permitLogin,
        logOut
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
