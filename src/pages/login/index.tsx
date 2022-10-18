import React, { useState } from "react";
import Head from "next/head";
import Router  from "next/router";
import { useContext } from "react";
import { getCookie,  } from "cookies-next";
import { NextPage, GetServerSidePropsContext } from "next";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import  {authContext}    from "../../components/login/authState";
import loginCss from "./Login.module.css";

const Login : NextPage = () => {

  const {message, singIn} = useContext(authContext)
  
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
        
            {<Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={formHandler}
              >
            
            <Form>
            <div className={loginCss.container}>
        <div className={loginCss.login_rectangle}>
            <div className={loginCss.login_header_box}>
                {/* {(message)?
                <div className={loginCss.error_general_msg}>
                {message}
                </div>
                :  
                null
                } */}
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
          </div>
        </div>                    
            </Form>
            </Formik> }
        
      
    </div>

  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext){
  const {req, res} = ctx
  const token  = getCookie("token", {req, res})
  if (token){
      return {redirect: {destination: '/',statusCode: 301,}}
  }
  return {
    props: {}, 
  }
}

export default Login;
