import React, {Fragment, useContext, useEffect, useState} from "react";
import { useRouter } from "next/router";
import appointmentCss from './Appointment.module.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, Loading } from "@nextui-org/react";
import SearchPatientManager from "./searchPatient/SearchPatientManager";

const Appointment = () => {
  const router = useRouter();
  // const { client, searchClientByCiRegisterBoxFn } = useContext( registerBoxContext );
  const [visible, setVisible] = useState(false);
  
  const handler = async () => { 
    setVisible(true);
  }

  const closeHandler = () => {
    setVisible(false);
  };

  const initialValues={
    ci_rif: ''
  }

  async function validateCi(value: any) {
    let error;

    if (!value) {
        return error = "Campo requerido";
    }

    // try {
    //     const resp = await customAxios.post("client/getbyci", {
    //     ci_rif: value,
    //     });
        
    // } catch (errorPetition: any) {
    //     error = errorPetition.response.data?.msg || errorPetition.message;
    // }

    return error;
  }

  const formHandler = async  (values : any) =>{
    // await searchClientByCiRegisterBoxFn(values.ci_rif);
  }
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