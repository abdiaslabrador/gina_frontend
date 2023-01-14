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
    patient : {} as PatientInf,
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
        // cleanPatientsFn,
      }}
    >
      {children}
    </patientContext.Provider>
  );
};

export default PatientProvider;
