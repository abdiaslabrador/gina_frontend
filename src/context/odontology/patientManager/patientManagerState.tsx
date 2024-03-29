import React, {useContext} from "react";
import { useRouter } from "next/router";
import { useReducer } from "react";
import customAxios from "../../../config/axios";
import patientManagerReducer from "./patientManagerReducer";
import {PatientInf} from "../../../interface/odontology/patientInf";
import {patientManagerContext} from './patientManagerContext';
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
    CLEAN_STATE
  } from "./patientManagerType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const PatientManagerProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { logOut } = useContext(authContext);
  

  const initialState = {
    selectedPatient : {} as PatientInf,
    patientList : [],
    msjSuccessPatientList : "",
    msjErrorPatientList : "",
    loadingFormPatientList: false,
    loadingPatientList: false,
    selectOption: "ci_rif",
  };

  const [state, dispatch] = useReducer(patientManagerReducer, initialState);

  function setSelectOptionFn(optionSelected : string){
    dispatch({type: SET_SELECTED_SELECT, selectOption: optionSelected})
  }

  function setSelectedPatientFn(patient: PatientInf) {
    dispatch({
      type: SET_SELECTED_PATIENT,
      selectedPatient: patient
    })
  }

  function cleanPatientsFn(){
        dispatch({type: CLEAN_STATE});
  }

  

  async function createPatientFn(patient : any) {
    try {
        dispatch({ type: LOADING_FORM, loadingFormPatientList: true })
        await customAxios.post("patient/create", {
          patient: patient,
        });
      
        dispatch({
          type: CREATE_PATIENT,
          msjSuccessPatientList: "Paciente creado exitosamente",
          msjErrorPatientList: "",
          loadingFormPatientList: false,
        })
        setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessPatientList:""}), 8000);
        saveErrorFromServerFn(false);

    } catch (error : any ) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: LOADING_FORM, loadingFormPatientList: false });
      console.log(error );

        if(error.response?.status == "400"){
          dispatch({type:UPDATE_MSJ_ERROR, msjErrorPatientList:message});
          setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjErrorPatientList:""}), 8000);
          
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
      dispatch({ type: LOADING_FORM, loadingFormPatientList: true })
      const resp = await customAxios.post("/patient/delete", {id: patientId});
      dispatch({
        type: DELETE_PATIENT,
        patientList: resp.data,
        selectedPatient: ({} as PatientInf),
        loadingFormPatientList: false
      })
      saveErrorFromServerFn(false);

    } catch (error:any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: PATIENT_ERROR});
      dispatch({type: LOADING_FORM, loadingFormPatientList: false });
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
      dispatch({ type: LOADING_FORM, loadingFormPatientList: true })
      await customAxios.post("patient/update", {
        patient: patient
      });
      dispatch({
        type: UPDATE_PATIENT,
        patientList: [patient],
        selectedPatient: patient,
        msjSuccessPatientList: "Paciente actualizado exitosamente",
        msjErrorPatientList: "",
        loadingFormPatientList: false,
      })
      setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessPatientList:""}), 8000);
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: PATIENT_ERROR});
      dispatch({type: LOADING_FORM, loadingFormPatientList: false });
      console.log(error);

      if(error.response?.status == "404"){//el usuario se intenta actualizar pero no está en la base de datos
        dispatch({type:UPDATE_MSJ_ERROR, msjErrorPatientList:message})
        setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjErrorPatientList:""}), 8000);
     
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
    <patientManagerContext.Provider
      value={{
        selectedPatient: state.selectedPatient,
        patientList: state.patientList,
        msjSuccessPatientList : state.msjSuccessPatientList,
        msjErrorPatientList : state.msjErrorPatientList,
        loadingFormPatientList: state.loadingFormPatientList,
        loadingPatientList: state.loadingPatientList,
        selectOption: state.selectOption,
        createPatientFn,
        setSelectedPatientFn,
        setSelectOptionFn,
        deletePatientFn,
        updatePatientFn,
        searchPatientByDateFn,
        searchPatientByNamesFn,
        searchPatientByCiFn,
        cleanPatientsFn
      }}
    >
      {children}
    </patientManagerContext.Provider>
  );
};

export default PatientManagerProvider;
