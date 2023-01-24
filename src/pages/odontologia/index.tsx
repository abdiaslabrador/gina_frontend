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
import Odontograma from "../../components/odontology/odontograma/Odontograma";
import Background from "../../components/odontology/background/Background";
import Appointment from "../../components/odontology/appointment/Appointment";
import AppointmentHistory from "../../components/odontology/appointment_history/AppointmentHistory";
import ServerError from "../../components/error/500";
import { errorServerContext } from '../../context/error/errorServerContext';
import PatientProvider from "../../context/odontology/patient/patientState";
import PatientManagerProvider from "../../context/odontology/patientManager/patientManagerState";
import AppointmentProvider from "../../context/odontology/work_table/appointment/appointmentState";
import OdontogramaProvider from "../../context/odontology/work_table/odontograma/odontogramaState";

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
        <PatientManagerProvider>
        <PatientProvider>
        <AppointmentProvider>
        <OdontogramaProvider>
          <SidebarOdont/>
          <Odontograma/>
          <Background/>
          <Appointment/>
          <AppointmentHistory/>
        </OdontogramaProvider>
        </AppointmentProvider>
        </PatientProvider>
        </PatientManagerProvider>

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