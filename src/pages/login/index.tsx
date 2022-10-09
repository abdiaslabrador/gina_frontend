import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

import LoginInf from "../../interface/auth";
import customAxios from "../../config/axios";
import authToken from "../../config/authToken";
import authReducer from "./authReducer";
import authTypes from "./authTypes";
import  {authContext}    from "./authState";

import loginCss from "./Login.module.css";

const form_initialState = {
  email: "",
  password: "",
};
const Login = () => {
  let token :string;
  const router = useRouter()
  const {user, mensaje, permitLogin, singIn} = useContext(authContext)

  useEffect(() => {
    const login_verify = async ()=>{
    await permitLogin()
    }
    login_verify()
  }, []);

  useEffect(() => {
    if(user) router.push('/')
  }, [user]);


  const [login_form_data_state, saveLoginFormData] =
    useState<LoginInf>(form_initialState);
  
  const { email, password } = login_form_data_state;

  const setInformation = (e: any) => {
    saveLoginFormData({
      ...login_form_data_state,
      [e.target.name]: e.target.value,
    });
  };

  
  const formHandler = async (e: any) => {
    e.preventDefault();
    await singIn(email, password)

  };

  return (
    <div className={loginCss.container}>
      <Head>
        <title>Login</title>
      </Head>
      <div className={loginCss.login_rectangle}>
        <form onSubmit={formHandler}>
          {/* <form onSubmit={userAuthenticated}> */}
          <div className={loginCss.error_msg}>
          {(mensaje)?<div className={loginCss.error_msg_color}>- {mensaje}</div>:null}
          </div>
          <input
            className={loginCss._form}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={setInformation}
          />
          <input
            className={loginCss._form}
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={setInformation}
          />
          <button className={loginCss.button_login} type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>

  );
};

export default Login;
