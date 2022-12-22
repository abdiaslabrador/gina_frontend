import React, {useContext} from "react";
import { useReducer } from "react";
import customAxios from "../../../config/axios";
import currencyReducer from "./currencyReducer";
import {currencyContext} from './currencyContext';
import {authContext} from '../../login/authContext';
import {errorServerContext} from '../../error/errorServerContext';

import {
    GET_CURRENCY,
    UPDATE_CURRENCY,
    CURRENCY_ERROR,
    LOADING_FORM,
    LOADING_CURRENCY,
    UPDATE_MSJ_SUCCESS,
    UPDATE_MSJ_ERROR,
  } from "./currencyType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const CurrencyProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { logOut } = useContext(authContext);
  

  const initialState = {
    currency: null,
    msjSuccess : "",
    msjError : "",
    loadingForm: false,
    loadingCurrency: true,
  };

  const [state, dispatch] = useReducer(currencyReducer, initialState);
  
  async function getCurrencyFn(){
    try {
      dispatch({ type: LOADING_CURRENCY, loadingCurrency: true })
      const resp = await customAxios.get("currency/getcurrency");
      dispatch({
        type: GET_CURRENCY,
        currency: resp.data,
        loadingCurrency: false,
      })
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: CURRENCY_ERROR});
      dispatch({type: LOADING_CURRENCY, loadingCurrency: false });
      console.log(error);

      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      }else {
        saveErrorFromServerFn(true);
      }
    }
  }

  async function updateCurrencyFn(currency : any){
    try {
      dispatch({ type: LOADING_FORM, loadingForm: true })
      await customAxios.post("currency/update", {
        id: currency.id,
        today_currency: currency.today_currency
      });
      dispatch({
        type: UPDATE_CURRENCY,
        currency: currency,
        msjSuccess: "Divisa actualizado exitosamente",
        msjError: "",
        loadingForm: false,
      })
      setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:""}), 8000);
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: CURRENCY_ERROR});
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
    <currencyContext.Provider
      value={{
        currency: state.currency,
        msjSuccess : state.msjSuccess,
        msjError : state.msjError,
        loadingForm: state.loadingForm,
        loadingCurrency: state.loadingCurrency,
        getCurrencyFn,
        updateCurrencyFn,
      }}
    >
      {children}
    </currencyContext.Provider>
  );
};

export default CurrencyProvider;
