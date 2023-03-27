import React, {useContext, useReducer} from "react";
import { useRouter } from "next/router";
import customAxios from "../../../../config/axios";
import {authContext} from '../../../login/authContext';
import {errorServerContext} from '../../../error/errorServerContext';
import {ToothInf} from "../../../../interface/odontology/odontogramaInf";
import odontogramaReducer from "./odontogramaReducer";
import {odontogramaContext} from './odontogramaContext';
import { patientContext } from "../../patient/patientContext";
import {
  SET_VISIBLE_TOOTH_OPTIONS,
  SET_SELECTED_TOOTH,
  LOADING_GET_THEE,
  THEE_ERROR,
  SET_ODTG_EDITABLE,
  LOADING_CREATE_UPDATE_TOOTH,
} from "./odontogramaType";


interface props {
  children: JSX.Element | JSX.Element[];
}

const OdontogramaProvider = ({ children }: props) => {
  const { patient } = useContext(patientContext);
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { logOut } = useContext(authContext);
  
  
  const initialState = {
    tooth: {} as ToothInf,
    visibleToothOptions: false,
    odontogramaEditable: null,
    // appointmentList: [],
    // appointmentSelected: {} as AppointmentInf,
    loadingTeethList: false,
    loadingCreateUpdateTeeth: false,
    // loadingFormAppointment: false,
    // msjSuccessAppointment : "",
    // msjErrorAppointment : "",
  };

  const [state, dispatch] = useReducer(odontogramaReducer, initialState);

  function setVisibleToothOptionsModalFn(visible : boolean){
    dispatch({ type: SET_VISIBLE_TOOTH_OPTIONS, 
               visibleToothOptions: visible 
             })
  }

  function setSelectedToothFn(tooth:any){
    dispatch({
      type: SET_SELECTED_TOOTH,
      tooth: tooth
    })
  }

  function fillOdontograma(theeFromDB : any[]){
    let thee_48_to_44 : ToothInf[] = [];
    let thee_43_to_41 : ToothInf[] = [];

    let thee_34_to_38 : ToothInf[] = [];
    let thee_31_to_33 : ToothInf[] = [];

    let thee_24_to_28 : ToothInf[] = [];
    let thee_21_to_23 : ToothInf[] = [];

    let thee_18_to_14 : ToothInf[] = [];
    let thee_13_to_11 : ToothInf[] = [];

    let tooth : ToothInf = {} as ToothInf;
    
    // {
    //   id:null,
    //   number: null,
    //   e:"",
    //   m:"",
    //   question: false,
    //   line: "",
    //   circle: "",
    //   ring: "",
    //   x: "",
    //   toothParts:{   
    //             id:null,
    //             one: "",
    //             two: "",
    //             three: "",
    //             four: "",
    //             five: ""
    //         }
    // };
    //48-44
    for(let i = 48; i>=44; i--){
      if(i == theeFromDB[theeFromDB.length-1]?.number ){
        thee_48_to_44.push(theeFromDB[theeFromDB.length-1])
          theeFromDB.pop()
      }else{
        thee_48_to_44.push({...tooth, number:i})
      }
    }
    //43-41
    for(let i = 43; i>=41; i--){
      if(i == theeFromDB[theeFromDB.length-1]?.number ){
        thee_43_to_41.push(theeFromDB[theeFromDB.length-1])
          theeFromDB.pop()
      }else{
          
        thee_43_to_41.push({...tooth, number:i})
      }
    }
    //38-34
    for(let i = 38; i>=34; i--){
      if(i == theeFromDB[theeFromDB.length-1]?.number ){
        thee_34_to_38.splice(0, 0, theeFromDB[theeFromDB.length-1])
          theeFromDB.pop()
      }else{
        thee_34_to_38.splice(0, 0, {...tooth, number:i})
      }
    }
    //33-31
    for(let i = 33; i>=31; i--){
      if(i == theeFromDB[theeFromDB.length-1]?.number ){
        thee_31_to_33.splice(0, 0, theeFromDB[theeFromDB.length-1])
          theeFromDB.pop()
      }else{
        thee_31_to_33.splice(0, 0, {...tooth, number:i})
    }
    }
    //28-24
    for(let i = 28; i>=24; i--){
      if(i == theeFromDB[theeFromDB.length-1]?.number ){
        thee_24_to_28.splice(0, 0, theeFromDB[theeFromDB.length-1])
          theeFromDB.pop()
      }else{
        thee_24_to_28.splice(0, 0, {...tooth, number:i})
      }
    }
    //23-21
    for(let i = 23; i>=21; i--){
      if(i == theeFromDB[theeFromDB.length-1]?.number ){
        thee_21_to_23.splice(0, 0, theeFromDB[theeFromDB.length-1])
          theeFromDB.pop()
      }else{
          
        thee_21_to_23.splice(0, 0, {...tooth, number:i})
    }
    }
    //18-14
    for(let i = 18; i>=14; i--){
      if(i == theeFromDB[theeFromDB.length-1]?.number ){
        thee_18_to_14.push(theeFromDB[theeFromDB.length-1])
          theeFromDB.pop()
      }else{
        thee_18_to_14.push({...tooth, number:i})
      }
    }
    //13-11
    for(let i = 13; i>=11; i--){
      if(i == theeFromDB[theeFromDB.length-1]?.number ){
        thee_13_to_11.push(theeFromDB[theeFromDB.length-1])
          theeFromDB.pop()
      }else{
          
        thee_13_to_11.push({...tooth, number:i})
      }
    }
    dispatch({ type: SET_ODTG_EDITABLE, odontogramaEditable: {
      thee_48_to_44 : thee_48_to_44,
      thee_43_to_41 : thee_43_to_41,

      thee_34_to_38 : thee_34_to_38,
      thee_31_to_33 : thee_31_to_33,

      thee_24_to_28 : thee_24_to_28,
      thee_21_to_23 : thee_21_to_23,

      thee_18_to_14 : thee_18_to_14,
      thee_13_to_11 : thee_13_to_11
    } })
    
  }

  async function getTeethFn(){
    try {
          dispatch({ type: LOADING_GET_THEE, loadingTeethList: true })
          const resp = await customAxios.post("odontograma/getthee", {
            patient: patient
          });
          fillOdontograma(resp.data);
          dispatch({ type: LOADING_GET_THEE, loadingTeethList: false })
          saveErrorFromServerFn(false);
    
        } catch (error : any) {
          let message = error.response.data?.msg || error.message;
          dispatch({type: THEE_ERROR});
          dispatch({type: LOADING_GET_THEE, loadingTeethList: false });
          console.log(error);
    
          if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
            await logOut();
    
          }else {
            saveErrorFromServerFn(true);
          }
        }
  }

  // function setAppointmentsFn(appointmentList : AppointmentInf[]){
  //   dispatch({ type: SET_APPOINTMENTS, appointmentList: appointmentList })
  // }
  async function createOrToothFn(tooth: any){
    try {
      dispatch({ type: LOADING_CREATE_UPDATE_TOOTH, loadingCreateUpdateTeeth: true })
      await customAxios.post("odontograma/tooth/createupdate", {
        tooth: tooth,
        patient: patient
      });
      await getTeethFn();
      dispatch({ type: LOADING_CREATE_UPDATE_TOOTH, loadingCreateUpdateTeeth: false })
      // dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessAppointment:"Consulta creada exitosamente"});
      // setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessAppointment:""}), 8000);
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: THEE_ERROR});
      dispatch({type: LOADING_CREATE_UPDATE_TOOTH, loadingCreateUpdateTeeth: false });
      console.log(error);

      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      }else {
        saveErrorFromServerFn(true);
      }
    }
  }

  // async function updateAppointmentFn(appointment:AppointmentInf){
  //   try {
  //         dispatch({ type: LOADING_FORM, loadingFormAppointment: true })
  //         const resp = await customAxios.post("appointment/update", {
  //           appointment: appointment,
  //         });
  //         await updateAppointmentListFn();
  //         dispatch({ type: LOADING_FORM, loadingFormAppointment: false })
  //         saveErrorFromServerFn(false);
    
  //       } catch (error : any) {
  //         let message = error.response.data?.msg || error.message;
  //         dispatch({type: APPOINTMENT_ERROR});
  //         dispatch({ type: LOADING_FORM, loadingFormAppointment: false });
  //         console.log(error);
    
  //         if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //           await logOut();
    
  //         }else {
  //           saveErrorFromServerFn(true);
  //         }
  //       }
  // }

  // async function deleteAppointmentFn(){
  //   try {
  //     dispatch({ type: LOADING_FORM, loadingFormAppointment: true })
  //     const resp = await customAxios.post("appointment/delete", {
  //       id: state.appointment.id,
  //     });
  //     await updateAppointmentListFn();
  //     dispatch({ type: LOADING_FORM, loadingFormAppointment: false })
  //     setVisibleAppointmentEditFn(false);
  //     saveErrorFromServerFn(false);

  //   } catch (error : any) {
  //     let message = error.response.data?.msg || error.message;
  //     dispatch({type: APPOINTMENT_ERROR});
  //     dispatch({ type: LOADING_FORM, loadingFormAppointment: false });
  //     console.log(error);

  //     if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //       await logOut();

  //     }else {
  //       saveErrorFromServerFn(true);
  //     }
  //   }
  // }

  // async function updateAppointmentListFn(){
  //   try {
  //         dispatch({ type: LOADING_GET_APPOINTMENTS, loadingAppointmentList: true })
  //         const resp = await customAxios.post("appointment/getappointments", {
  //           patient: patient
  //         });
  //         setAppointmentsFn(resp.data);
  //         dispatch({ type: LOADING_GET_APPOINTMENTS, loadingAppointmentList: false })
  //         saveErrorFromServerFn(false);
    
  //       } catch (error : any) {
  //         let message = error.response.data?.msg || error.message;
  //         dispatch({type: APPOINTMENT_ERROR});
  //         dispatch({type: LOADING_GET_APPOINTMENTS, loadingAppointmentList: false });
  //         console.log(error);
    
  //         if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //           await logOut();
    
  //         }else {
  //           saveErrorFromServerFn(true);
  //         }
  //       }
  // }

  // async function updateAppointment(appointment:any){
  //   try {
  //     dispatch({ type: LOADING_FORM, loadingFormAppointment: true })
  //     await customAxios.post("appointment/update", {
  //       appointment: appointment
  //     });
  //     dispatch({ type: LOADING_FORM, loadingFormAppointment: false })

  //     setAppointmentFn(appointment);
  //     dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessAppointment:"Paciente actualizado exitosamente"});
  //     setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessAppointment:""}), 8000);
  //     saveErrorFromServerFn(false);

  //   } catch (error : any) {
  //     let message = error.response.data?.msg || error.message;
  //     dispatch({type: APPOINTMENT_ERROR});
  //     dispatch({type: LOADING_FORM, loadingFormAppointment: false });
  //     console.log(error);

  //     if(error.response?.status == "404"){//el usuario se intenta actualizar pero no está en la base de datos
  //       dispatch({type:UPDATE_MSJ_ERROR, msjErrorAppointment:message})
  //       setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjErrorAppointment:""}), 8000);
     
  //     }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //       await logOut();

  //     }else {
  //       saveErrorFromServerFn(true);
  //     }
  //   }
  // }

  // async function deleteAppointment(id:number){
  //   try {
  //     dispatch({ type: LOADING_FORM, loadingFormAppointment: true })
  //     await customAxios.post("appointment/update", {
  //       appointment: appointment
  //     });
  //     dispatch({ type: LOADING_FORM, loadingFormAppointment: false })

  //     setAppointmentFn(appointment);
  //     dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessAppointment:"Paciente actualizado exitosamente"});
  //     setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccessAppointment:""}), 8000);
  //     saveErrorFromServerFn(false);

  //   } catch (error : any) {
  //     let message = error.response.data?.msg || error.message;
  //     dispatch({type: APPOINTMENT_ERROR});
  //     dispatch({type: LOADING_FORM, loadingFormAppointment: false });
  //     console.log(error);

  //     if(error.response?.status == "404"){//el usuario se intenta actualizar pero no está en la base de datos
  //       dispatch({type:UPDATE_MSJ_ERROR, msjErrorAppointment:message})
  //       setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjErrorAppointment:""}), 8000);
     
  //     }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //       await logOut();

  //     }else {
  //       saveErrorFromServerFn(true);
  //     }
  //   }
  // }
  // function cleanAppointmentsFn(){
  //       dispatch({type: APPOINTMENT_ERROR});
  // }
  

  return (
    <odontogramaContext.Provider
      value={{
        tooth: state.tooth,
        visibleToothOptions: state.visibleToothOptions,
        odontogramaEditable: state.odontogramaEditable,
        loadingTeethList: state.loadingTeethList,
        loadingCreateUpdateTeeth: state.loadingCreateUpdateTeeth,
        setVisibleToothOptionsModalFn,
        setSelectedToothFn,
        createOrToothFn,
        getTeethFn,
      }}
    >
      {children}
    </odontogramaContext.Provider>
  );
};

export default OdontogramaProvider;
