import React, {useContext, useReducer} from "react";
import { useRouter } from "next/router";
import customAxios from "../../../../config/axios";
import appointmentReducer from "./appointmentReducer";
import {AppointmentInf} from "../../../../interface/odontology/appointmentInf";
import {appointmentContext} from './appointmentContext';
import { patientContext } from "../../patient/patientContext";
import {authContext} from '../../../login/authContext';
import {errorServerContext} from '../../../error/errorServerContext';
import {
  SET_VISIBLE,
  SET_SELECTED_APPOIMENT,
  SET_APPOINTMENTS,
  LOADING_FORM,
  LOADING_GET_APPOINTMENTS,
  UPDATE_MSJ_SUCCESS,
  UPDATE_MSJ_ERROR,
  APPOINTMENT_ERROR
} from "./appointmentType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const AppointmentProvider = ({ children }: props) => {
  const { patient } = useContext(patientContext);
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { logOut } = useContext(authContext);
  

  const initialState = {
    visibleAppointmentEdit: false, 
    appointment: {} as AppointmentInf,
    appointmentList: [],
    appointmentSelected: {} as AppointmentInf,
    loadingAppointmentList: false,
    loadingFormAppointment: false,
    msjSuccessAppointment : "",
    msjErrorAppointment : "",
  };

  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  function setVisibleAppointmentEditFn(visible : boolean){
    dispatch({ type: SET_VISIBLE, visibleAppointmentEdit: visible })
  }
  function setSelectedAppointmentFn(appointment:AppointmentInf) {
    dispatch({
      type: SET_SELECTED_APPOIMENT,
      appointment: appointment
    })
  }
  function setAppointmentsFn(appointmentList : AppointmentInf[]){
    dispatch({ type: SET_APPOINTMENTS, appointmentList: appointmentList })
  }
  async function createAppointmentFn(appointment:any){
    try {
      dispatch({ type: LOADING_FORM, loadingFormAppointment: true })
      await customAxios.post("appointment/create", {
        appointment: appointment,
        patient: patient
      });
      await updateAppointmentListFn();
      dispatch({ type: LOADING_FORM, loadingFormAppointment: false })
      // dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessAppointment:"Consulta creada exitosamente"});
      // setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessAppointment:""}), 8000);
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: APPOINTMENT_ERROR});
      dispatch({type: LOADING_FORM, loadingFormAppointment: false });
      console.log(error);

      if(error.response?.status == "404"){//el usuario se intenta actualizar pero no está en la base de datos
        dispatch({type:UPDATE_MSJ_ERROR, msjErrorAppointment:message})
        setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjErrorAppointment:""}), 8000);
     
      }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      }else {
        saveErrorFromServerFn(true);
      }
    }
  }

  async function updateAppointmentFn(appointment:AppointmentInf){
    try {
          dispatch({ type: LOADING_FORM, loadingFormAppointment: true })
          const resp = await customAxios.post("appointment/update", {
            appointment: appointment,
          });
          await updateAppointmentListFn();
          dispatch({ type: LOADING_FORM, loadingFormAppointment: false })
          dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessAppointment:"Consulta actualizada exitosamente"});
          setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessAppointment:""}), 8000);
          saveErrorFromServerFn(false);
    
        } catch (error : any) {
          let message = error.response.data?.msg || error.message;
          dispatch({type: APPOINTMENT_ERROR});
          dispatch({ type: LOADING_FORM, loadingFormAppointment: false });
          console.log(error);
    
          if(error.response?.status == "404") { 
            dispatch({type:UPDATE_MSJ_ERROR, msjErrorAppointment:message});
            setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjErrorAppointment:""}), 8000);
            await updateAppointmentListFn();
            
          }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
            await logOut();
    
          }else {
            saveErrorFromServerFn(true);
          }
        }
  }

  async function deleteAppointmentFn(){
    try {
      dispatch({ type: LOADING_FORM, loadingFormAppointment: true })
      const resp = await customAxios.post("appointment/delete", {
        id: state.appointment.id,
      });
      await updateAppointmentListFn();
      dispatch({ type: LOADING_FORM, loadingFormAppointment: false })
      setVisibleAppointmentEditFn(false);
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: APPOINTMENT_ERROR});
      dispatch({ type: LOADING_FORM, loadingFormAppointment: false });
      console.log(error);
      
      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      }else {
        saveErrorFromServerFn(true);
      }
    }
  }

  async function updateAppointmentListFn(){
    try {
          dispatch({ type: LOADING_GET_APPOINTMENTS, loadingAppointmentList: true })
          const resp = await customAxios.post("appointment/getappointments", {
            patient: patient
          });
          setAppointmentsFn(resp.data);
          dispatch({ type: LOADING_GET_APPOINTMENTS, loadingAppointmentList: false })
          saveErrorFromServerFn(false);
    
        } catch (error : any) {
          let message = error.response.data?.msg || error.message;
          dispatch({type: APPOINTMENT_ERROR});
          dispatch({type: LOADING_GET_APPOINTMENTS, loadingAppointmentList: false });
          console.log(error);
    
          if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
            await logOut();
    
          }else {
            saveErrorFromServerFn(true);
          }
        }
  }

  return (
    <appointmentContext.Provider
      value={{
        appointment: state.appointment,
        visibleAppointmentEdit: state.visibleAppointmentEdit,
        appointmentList: state.appointmentList,
        appointmentSelected: state.appointmentSelected,
        loadingAppointmentList: state.loadingAppointmentList,
        loadingFormAppointment: state.loadingFormAppointment,
        msjSuccessAppointment : state.msjSuccessAppointment,
        msjErrorAppointment : state.msjErrorAppointment,
        createAppointmentFn,
        updateAppointmentFn,
        deleteAppointmentFn,
        updateAppointmentListFn,
        setVisibleAppointmentEditFn,
        setSelectedAppointmentFn,
      }}
    >
      {children}
    </appointmentContext.Provider>
  );
};

export default AppointmentProvider;
