import React, {Fragment, useContext, useEffect, useState} from "react";
import { useRouter } from "next/router";
import appointmentCss from './Appointment.module.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, Loading } from "@nextui-org/react";
import SearchPatientManager from "./searchPatient/SearchPatientManager";

const Appointment = () => {
  const router = useRouter();
  
  const paciente = false;
  return (
    <div className={appointmentCss["container"]}>
         
          <div className={appointmentCss["buttom_form"]}>
            {(!paciente)?
              <SearchPatientManager/>
            :
              <div>Paciente seleccionado</div>
            }
          </div>
    </div>
  );
};

export default Appointment;