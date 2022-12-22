import React, {useContext} from "react";
import { useRouter } from "next/router";
import { useReducer } from "react";
import customAxios from "../../../config/axios";
import clientReducer from "./clientReducer";
import {ClientInf} from "../../../interface/clientInf";
import {clientContext} from './clientContext';
import {authContext} from '../../login/authContext';
import {errorServerContext} from '../../error/errorServerContext';

import {
  GET_CLIENT,
    CREATE_CLIENT,
    SET_SELECTED_CLIENT,
    DELETE_CLIENT,
    UPDATE_CLIENT,
    CLIENTS_ERROR,
    LOADING_FORM,
    UPDATE_MSJ_SUCCESS,
    UPDATE_MSJ_ERROR,
  } from "./clientType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const ClientProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { logOut } = useContext(authContext);
  

  const initialState = {
    selectedClient : {} as ClientInf,
    clientList : [],
    msjSuccess : "",
    msjError : "",
    loadingForm: false,
  };

  const [state, dispatch] = useReducer(clientReducer, initialState);

  function setSelectedClientFn(client: ClientInf) {
    dispatch({
      type: SET_SELECTED_CLIENT,
      selectedClient: client
    })
  }

  function cleanClientsFn(){
        dispatch({type: CLIENTS_ERROR});
  }

  async function searchClientByCiFn(ci_rif:string){
      try {
        dispatch({type: LOADING_FORM, loadingForm: true });
        const response = await customAxios.post("/client/getbyci",{
          ci_rif : ci_rif
        });
        dispatch({
          type: GET_CLIENT,
          clientList: [response.data],
          loadingForm: false
        })
        saveErrorFromServerFn(false);
      } catch (error : any) {
        let message = error.response.data?.msg || error.message;
        dispatch({type: LOADING_FORM, loadingForm: false });
        console.log(error);
        if(error.response?.status == "400"){
          console.log("Usuario no encontrado")
          
        } else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          dispatch({type: CLIENTS_ERROR})
          await logOut();

        } else {
          saveErrorFromServerFn(true);
        }
      }
  }

  async function createClientFn(client : any){
    try {
      dispatch({ type: LOADING_FORM, loadingForm: true })
      await customAxios.post("client/create", {
        name: client.name,
        last_name: client.last_name,
        ci_rif: client.ci_rif,
        phone_number: client.phone_number,
        direction: client.direction,
      });
      
        dispatch({
          type: CREATE_CLIENT,
          msjSuccess: "Usuario creado exitosamente",
          msjError: "",
          loadingForm: false,
        })
        setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:""}), 8000);
        saveErrorFromServerFn(false);

    } catch (error : any ) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: LOADING_FORM, loadingForm: false });
      console.log(error );

        if(error.response?.status == "400"){
          dispatch({type:UPDATE_MSJ_ERROR, msjError:message});
          setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjError:""}), 8000);
          
        }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          dispatch({type: CLIENTS_ERROR});
          await logOut();

        }else {
          saveErrorFromServerFn(true);
        }
    }
  }

  async function deleteClientFn(clientId : number){
    try {
      dispatch({ type: LOADING_FORM, loadingForm: true })
      const resp = await customAxios.post("/client/delete", {id: clientId});
      dispatch({
        type: DELETE_CLIENT,
        clientList: resp.data,
        selectedClient: ({} as ClientInf),
        loadingForm: false
      })
      saveErrorFromServerFn(false);

    } catch (error:any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: CLIENTS_ERROR});
      dispatch({type: LOADING_FORM, loadingForm: false });
      console.log(error);

        if (error.response?.status == "404") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
            console.log(message)
        } 
        else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          await logOut();

        }else {
          saveErrorFromServerFn(true);
        }
    }
  }

  async function updateClientFn(client : ClientInf){
    try {
      dispatch({ type: LOADING_FORM, loadingForm: true })
      await customAxios.post("client/update", {
        id: client.id,
        name: client.name,
        last_name: client.last_name,
        ci_rif: client.ci_rif,
        phone_number: client.phone_number,
        direction: client.direction,
      });
      dispatch({
        type: UPDATE_CLIENT,
        clientList: [client],
        selectedClient: client,
        msjSuccess: "Cliente actualizado exitosamente",
        msjError: "",
        loadingForm: false,
      })
      setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:""}), 8000);
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: CLIENTS_ERROR});
      dispatch({type: LOADING_FORM, loadingForm: false });
      console.log(error);

      if(error.response?.status == "404"){//el usuario se intenta actualizar pero no está en la base de datos
        dispatch({type:UPDATE_MSJ_ERROR, msjError:message})
        setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjError:""}), 8000);
     
      }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      }else {
        saveErrorFromServerFn(true);
      }
    }
  }

  

  return (
    <clientContext.Provider
      value={{
        selectedClient: state.selectedClient,
        clientList: state.clientList,
        msjSuccess : state.msjSuccess,
        msjError : state.msjError,
        loadingForm: state.loadingForm,
        searchClientByCiFn,
        cleanClientsFn,
        createClientFn,
        setSelectedClientFn,
        deleteClientFn,
        updateClientFn,
      }}
    >
      {children}
    </clientContext.Provider>
  );
};

export default ClientProvider;
