import React, {useContext} from "react";
import { useRouter } from "next/router";
import { useReducer } from "react";
import customAxios from "../../../config/axios";
import patientReducer from "./patientReducer";
import {PatientInf} from "../../../interface/odontology/patientInf";
import {patientContext} from './patientContext';
import {authContext} from '../../login/authContext';
import {errorServerContext} from '../../error/errorServerContext';

import {
    GET_PATIENT,
    CREATE_PATIENT,
    SET_SELECTED_PATIENT,
    SET_SELECTED_SELECT,
    DELETE_PATIENT,
    UPDATE_PATIENT,
    PATIENT_ERROR,
    LOADING_FORM,
    LOADING_GET_PATIENT,
    UPDATE_MSJ_SUCCESS,
    UPDATE_MSJ_ERROR,
  } from "./patientType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const PatientProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { logOut } = useContext(authContext);
  

  const initialState = {
    selectedPatient : {} as PatientInf,
    patientList : [],
    msjSuccessPatient : "",
    msjErrorPatient : "",
    loadingFormPatient: false,
    loadingPatientList: false,
    selectOption: "ci_rif",
  };

  const [state, dispatch] = useReducer(patientReducer, initialState);

  function setSelectOptionFn(optionSelected : string){
    dispatch({type: SET_SELECTED_SELECT, selectOption: optionSelected})
  }

  function setSelectedPatientFn(patient: PatientInf) {
    dispatch({
      type: SET_SELECTED_PATIENT,
      selectedPatient: patient
    })
  }

  // function cleanPatientsFn(){
  //       dispatch({type: PATIENT_ERROR});
  // }

  

  async function createPatientFn(patient : any) {
    try {
        dispatch({ type: LOADING_FORM, loadingFormPatient: true })
        await customAxios.post("patient/create", {
          patient: patient,
        });
      
        dispatch({
          type: CREATE_PATIENT,
          msjSuccessPatient: "Paciente creado exitosamente",
          msjErrorPatient: "",
          loadingFormPatient: false,
        })
        setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessPatient:""}), 8000);
        saveErrorFromServerFn(false);

    } catch (error : any ) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: LOADING_FORM, loadingFormPatient: false });
      console.log(error );

        if(error.response?.status == "400"){
          dispatch({type:UPDATE_MSJ_ERROR, msjErrorPatient:message});
          setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjErrorPatient:""}), 8000);
          
        }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          dispatch({type: PATIENT_ERROR});
          await logOut();

        }else {
          saveErrorFromServerFn(true);
        }
    }
  }

  async function deletePatientFn(patientId : number){
    try {
      dispatch({ type: LOADING_FORM, loadingFormPatient: true })
      const resp = await customAxios.post("/patient/delete", {id: patientId});
      dispatch({
        type: DELETE_PATIENT,
        patientList: resp.data,
        selectedPatient: ({} as PatientInf),
        loadingFormPatient: false
      })
      saveErrorFromServerFn(false);

    } catch (error:any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: PATIENT_ERROR});
      dispatch({type: LOADING_FORM, loadingFormPatient: false });
      console.log(error);

        if (error.response?.status == "404") { 
            console.log(message)
        } 
        else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          await logOut();

        }else {
          saveErrorFromServerFn(true);
        }
    }
  }

  async function updatePatientFn(patient : PatientInf){
    try {
      dispatch({ type: LOADING_FORM, loadingFormPatient: true })
      await customAxios.post("patient/update", {
        patient: patient
      });
      dispatch({
        type: UPDATE_PATIENT,
        patientList: [patient],
        selectedPatient: patient,
        msjSuccessPatient: "Paciente actualizado exitosamente",
        msjErrorPatient: "",
        loadingFormPatient: false,
      })
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

  async function searchPatientByCiFn(ci_rif:string){
    try {
      dispatch({type: LOADING_GET_PATIENT, loadingPatientList: true });
      const response = await customAxios.post("/patient/getbyci",{
        ci_rif : ci_rif
      });
      dispatch({
        type: GET_PATIENT,
        patientList: [response.data],
        loadingPatientList: false
      })
      saveErrorFromServerFn(false);
    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: LOADING_GET_PATIENT, loadingPatientList: false });
      dispatch({type: PATIENT_ERROR})
      console.log(error);
      if(error.response?.status == "404"){
        console.log("paciente no encontrado")
        
      } else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      } else {
        saveErrorFromServerFn(true);
      }
    }
  }

  async function searchPatientByNamesFn(name : string, last_name : string) {
    try {
      dispatch({ type: LOADING_GET_PATIENT, loadingPatientList: true })
      const response = await customAxios.post("/patient/getbynames",{
        name: name,
        last_name: last_name
      });
      dispatch({
        type: GET_PATIENT,
        patientList: response.data,
        loadingPatientList: false,
      })
      saveErrorFromServerFn(false);
    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({ type: LOADING_GET_PATIENT, loadingPatientList: false })
      dispatch({type: PATIENT_ERROR,})

      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      } else {
        saveErrorFromServerFn(true);
      }
    }
  }

  async function searchPatientByDateFn(birthday : string) {
    try {
      dispatch({ type: LOADING_GET_PATIENT, loadingPatientList: true })
      const response = await customAxios.post("/patient/getbybirthday",{
        birthday: birthday
      });
      dispatch({
        type: GET_PATIENT,
        patientList: response.data,
        loadingPatientList: false,
      })
      saveErrorFromServerFn(false);
    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({ type: LOADING_GET_PATIENT, loadingPatientList: false })
      dispatch({type: PATIENT_ERROR,})

      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      } else {
        saveErrorFromServerFn(true);
      }
    }
  }

  return (
    <patientContext.Provider
      value={{
        selectedPatient: state.selectedPatient,
        patientList: state.patientList,
        msjSuccessPatient : state.msjSuccessPatient,
        msjErrorPatient : state.msjErrorPatient,
        loadingFormPatient: state.loadingFormPatient,
        loadingPatientList: state.loadingPatientList,
        selectOption: state.selectOption,
        // searchPatientByCiFn,
        // cleanPatientsFn,
        createPatientFn,
        setSelectedPatientFn,
        setSelectOptionFn,
        deletePatientFn,
        updatePatientFn,
        searchPatientByDateFn,
        searchPatientByNamesFn,
        searchPatientByCiFn,
      }}
    >
      {children}
    </patientContext.Provider>
  );
};

export default PatientProvider;
