import React, {Fragment, useContext, useEffect, useState} from "react";
import { useRouter } from "next/router";
import appointmentCss from './Appointment.module.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, Loading } from "@nextui-org/react";
import SearchPatientManager from "./searchPatient/SearchPatientManager";
import { patientContext } from "../../../context/odontology/patient/patientContext";
import Appointment_form from "./appointment_form/Appointment_form";

const Appointment = () => {
  const router = useRouter();
  const {patient} = useContext(patientContext);
  
  return (
    <div className={appointmentCss["container"]}>
         
          <div className={appointmentCss["buttom_form"]}>
            <div className={appointmentCss["search_patient"]}>
              <SearchPatientManager/>
            </div>
              <Appointment_form/>
            </div>
    </div>
  );
};

export default Appointment;