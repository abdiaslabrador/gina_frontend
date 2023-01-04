import React, {useContext, useReducer} from "react";
import customAxios from "../../../../config/axios";
import foreignPaymentReducer from "./foreignPaymentReducer";
import {foreignPaymentContext} from './foreignPaymentContext';
import {authContext} from '../../../login/authContext';
import {errorServerContext} from '../../../error/errorServerContext';

import {
  GET_FPAYMENTS,
  LOADING_GET_FPAYMENTS,
  SET_SELECTED_FORPAYMENT,
  FPAYMENTS_ERROR,
  } from "./foreignPaymentType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const ForeignPaymentProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { logOut } = useContext(authContext);

  const initialState = {
    foreignPaymentList: [],
    selectedForeignPayment: null,
    // msjSuccessNPayment : "",
    // msjErrorNPayment : "",
    loadingForeignPayments: false,
  };

  const [state, dispatch] = useReducer(foreignPaymentReducer, initialState);
  
  function setSelectedForeignMethodFn(paymentType : any){
    dispatch({ type: SET_SELECTED_FORPAYMENT, selectedForeignPayment: paymentType })
  }

  async function getForeignPaymentsFn(){
    try {
      dispatch({ type: LOADING_GET_FPAYMENTS, loadingForeignPayments: true })
      const resp = await customAxios.get("paymenttype/foreign");
      dispatch({
        type: GET_FPAYMENTS,
        foreignPaymentList: resp.data,
        loadingForeignPayments: false,
      })
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: FPAYMENTS_ERROR});
      dispatch({ type: LOADING_GET_FPAYMENTS, loadingForeignPayments: false })
      console.log(error);

      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      }else {
        saveErrorFromServerFn(true);

      }
    }
  }

  return (
    <foreignPaymentContext.Provider
      value={{
        foreignPaymentList: state.foreignPaymentList,
        selectedForeignPayment : state.selectedForeignPayment,
        loadingForeignPayments: state.loadingForeignPayments,
        getForeignPaymentsFn,
        setSelectedForeignMethodFn,
      }}
    >
      {children}
    </foreignPaymentContext.Provider>
  );
};

export default ForeignPaymentProvider;
