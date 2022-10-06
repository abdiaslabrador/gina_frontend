import React from "react";
import Head from "next/head";
import { LoginInf } from "../../interface/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import loginCss from "./styles/Login.module.css";
const axios = require("axios").default;

const backendUrl = "http://localhost:4000";
const Login = () => {
  let token: string = "";

  if (typeof window !== "undefined") {
    token = String(localStorage.getItem("token"));
    if (token) {
    }
  }
  const router = useRouter();
  const [login_form_data, saveLoginFormData] = useState<LoginInf>({
    email: "",
    password: "",
  });

  const { email, password } = login_form_data;

  const setInformation = (e: any) => {
    saveLoginFormData({
      ...login_form_data,
      [e.target.name]: e.target.value,
    });
  };

  function formHandler(e: any) {
    e.preventDefault();
    axios
      .post(backendUrl + "/api/auth/login", {
        email: email,
        password: password,
      })
      .then(function (resp: any) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", JSON.stringify(resp.data));
          router.replace("/");
        }
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  return (
    <div className={loginCss.container}>
      <Head>
        <title>Login</title>
      </Head>
      <div className={loginCss.login_rectangle}>
        <form onSubmit={formHandler}>
          <ul className={loginCss.error_msg}>
            <li>ERROR AL INTRODUCIR LOS DATOS</li>
          </ul>
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
