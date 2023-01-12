import {  Loading, } from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useContext, useState, Fragment } from "react";
import Head from "next/head";
import WithLayout from "../../components/layout/HocLayoutHeader";
import { NextPage, GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
// import { authContext } from "../../context/login/authContext";
// import customAxios from "../../config/axios";
import odontologyCss from "./Odontology.module.css";
import SidebarOdont from "../../components/odontology/sidebar/SidebarOdontology";
import ServerError from "../../components/error/500";
import { errorServerContext } from '../../context/error/errorServerContext';

// import comunModalCss from "../../styles/modal.module.css";

const Odontology: NextPage = () => {
  // const { user, message, loadingForm, loadingPasswordForm, userAuthenticated, updateEmployeeFn, updateEmployeePasswordFn } = useContext(authContext);
  const { errorFromServer } = useContext(errorServerContext);
  // const [ showForm, setShowForm ] = useState(false);

  return (
    <Fragment>
      <Head>
        <title>Odontología</title>
      </Head>
      {!errorFromServer ? (
        <div className={odontologyCss["container"]}>
        <SidebarOdont/>
          <div className={odontologyCss["main"]}>
            
          </div>
        </div>
      ):(
      <div>
        <ServerError />
      </div>) 
      }
    </Fragment>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext){
    const {req, res} = ctx
    const token  = getCookie("token", {req, res})

    if (!token) {return {redirect: {destination: '/login',statusCode: 301,},}}

    return {
      props: {},
    }
  }

export default WithLayout(Odontology);

// async function validateCi(value: any) {
//   let error;

//   if (!value.trim()) {
//     error = "Campo requerido";
//   }
//   try {
//     const resp = await customAxios.post("employee/getbyciupdate", {
//       look_ci_rif: value.toLowerCase().trim(),
//       ci_rif: user.ci_rif,
//     });
//     if (resp?.data) {
//       error = "Usuario ya existe";
//     }
//   } catch (errorPetition: any) {
//     if (errorPetition.response?.status != "404") {
//       error = errorPetition.response.data?.msg || errorPetition.message;
//     }
//   }

//   return error;
// }