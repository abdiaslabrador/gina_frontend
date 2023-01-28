import React, {useContext, useReducer} from "react";
import { useRouter } from "next/router";
import customAxios from "../../../config/axios";
import patientReducer from "./patientReducer";
import {PatientInf} from "../../../interface/odontology/patientInf";
import {patientContext} from './patientContext';
import {authContext} from '../../login/authContext';
import {errorServerContext} from '../../error/errorServerContext';
import {
  SET_PATIENT,
  LOADING_FORM,
  LOADING_GET_PATIENT,
  UPDATE_MSJ_SUCCESS,
  UPDATE_MSJ_ERROR,
  PATIENT_ERROR
} from "./patientType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const PatientProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { logOut } = useContext(authContext);
  

  const initialState = {
    patient : null,
    loadingFormPatient: false,
    loadingPatient: false,
    msjSuccessPatient : "",
    msjErrorPatient : "",
  };

  const [state, dispatch] = useReducer(patientReducer, initialState);

  function setPatientFn(patient: PatientInf) {
    dispatch({
      type: SET_PATIENT,
      patient: patient
    })
  }

  async function updatePatientProfileFn(patient : PatientInf){
    try {
      dispatch({ type: LOADING_FORM, loadingFormPatient: true })
      await customAxios.post("patient/update", {
        patient: patient
      });
      dispatch({ type: LOADING_FORM, loadingFormPatient: false })

      setPatientFn(patient);
      dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessPatient:"Paciente actualizado exitosamente"});
      setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessPatient:""}), 8000);
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: PATIENT_ERROR});
      dispatch({type: LOADING_FORM, loadingFormPatient: false });
      console.log(error);

      if(error.response?.status == "404"){//el usuario se intenta actualizar pero no está en la base de datos
        dispatch({type:UPDATE_MSJ_ERROR, msjErrorPatient:message})
        setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjErrorPatient:""}), 8000);
     
      }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      }else {
        saveErrorFromServerFn(true);
      }
    }
  }

  // function cleanPatientsFn(){
  //       dispatch({type: PATIENT_ERROR});
  // }
  

  return (
    <patientContext.Provider
      value={{
        patient : state.patient,
        loadingFormPatient: state.loadingFormPatient,
        loadingPatient: state.loadingPatient,
        msjSuccessPatient : state.msjSuccessPatient,
        msjErrorPatient : state.msjErrorPatient,
        setPatientFn,
        updatePatientProfileFn,
        // cleanPatientsFn,
      }}
    >
      {children}
    </patientContext.Provider>
  );
};

export default PatientProvider;
