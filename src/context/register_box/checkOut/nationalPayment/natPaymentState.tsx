import React, {useContext, useReducer} from "react";
import customAxios from "../../../../config/axios";
import natPaymentReducer from "./natPaymentReducer";
import {natPaymentContext} from './natPaymentContext';
import {authContext} from '../../../login/authContext';
import {errorServerContext} from '../../../error/errorServerContext';

import {
    GET_NPAYMENTS,
    LOADING_GET_NPAYMENTS,
    SET_SELECTED_NATPAYMENT,
    NPAYMENTS_ERROR,
  } from "./natPaymentType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const NatPaymentProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { logOut } = useContext(authContext);

  const initialState = {
    nationalPaymentList: [],
    selectedNatPayment: null,
    // msjSuccessNPayment : "",
    // msjErrorNPayment : "",
    loadingNatPayments: false,
  };

  const [state, dispatch] = useReducer(natPaymentReducer, initialState);
  
  function setSelectedNatMethodFn(paymentType : any){
    dispatch({ type: SET_SELECTED_NATPAYMENT, selectedNatPayment: paymentType })
  }

  async function getNatPaymentsFn(){
    try {
      dispatch({ type: LOADING_GET_NPAYMENTS, loadingNatPayments: true })
      const resp = await customAxios.get("paymenttype/national");
      dispatch({
        type: GET_NPAYMENTS,
        nationalPaymentList: resp.data,
        loadingNatPayments: false,
      })
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: NPAYMENTS_ERROR});
      dispatch({ type: LOADING_GET_NPAYMENTS, loadingNatPayments: false })
      console.log(error);

      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      }else {
        saveErrorFromServerFn(true);

      }
    }
  }

  return (
    <natPaymentContext.Provider
      value={{
        nationalPaymentList: state.nationalPaymentList,
        selectedNatPayment : state.selectedNatPayment,
        loadingNatPayments: state.loadingNatPayments,
        getNatPaymentsFn,
        setSelectedNatMethodFn,
      }}
    >
      {children}
    </natPaymentContext.Provider>
  );
};

export default NatPaymentProvider;
