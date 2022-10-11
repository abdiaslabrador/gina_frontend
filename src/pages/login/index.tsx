import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import LoginInf from "../../interface/auth";
import customAxios from "../../config/axios";
import authToken from "../../config/authToken";
import authReducer from "./authReducer";
import authTypes from "./authTypes";
import  {authContext}    from "./authState";


import loginCss from "./Login.module.css";
import { divide } from "lodash";

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
    await permitLogin() //revisa el token y deja en el login o redirige al home
    }
    login_verify()
  }, []);

  useEffect(() => {
    const login_verify_user = async ()=>{
      if(user) await router.push('/')
    }
    login_verify_user()
    
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

  
  

  const initialValues={
     email: '', 
     password: ''
  }

  const validationSchema = Yup.object({
    email : Yup.string().email("Email mal escrito").required("El email es un campo requerido"),
    password : Yup.string().min(6, "Tiene que tener más de 6 carácteres").required("La contraseña es un campo requerido")
  })

  const formHandler = async (values:any) => {
    // e.preventDefault();
    const {email, password} = values;
    await singIn(email, password)

  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className={loginCss.container}>
      <div className={loginCss.login_rectangle}>
          {<Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={formHandler}
            >
          
          <Form>
          <div className={loginCss.login_header_box}>
              {(mensaje)?
              <div className={loginCss.error_general_msg}>
              {mensaje}
              </div>
              :  
              null
              }
          </div>
          <div className={loginCss.login_form_box}>
            <Field
                className={loginCss._form}
                type="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage className={loginCss.input_error_msg} component="div" name="email"/> 
            </div>
          
                    
            <div className={loginCss.login_form_box}>
              <Field
                className={loginCss._form}
                type="password"
                name="password"
                placeholder="Contraseña"
              />
              <ErrorMessage className={loginCss.input_error_msg} component="div" name="password"/>          
            </div>
            
            
            <div className={loginCss.login_buttom_box}>
                <button className={loginCss.button_login} type="submit">
                  Entrar
                </button>
            </div>
          </Form>
          </Formik> }
        </div>
        
      </div>
    </div>

  );
};

export default Login;
