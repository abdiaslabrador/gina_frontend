import React, {useContext} from "react";
import { useReducer } from "react";
import customAxios from "../../../../config/axios";
import finishPurchaseReducer from "./finishPurchaseReducer";
import {finishPurchaseContext} from "./finishPurchaseContext";
import {registerBoxContext} from '../../register_box/registerBoxContext';
import {paymentMadeContext} from "../paymentMade/paymentMadeContext";
import {currencyContext} from '../../currency/currencyContext';
import {docAccountContext} from '../../documentAccount/docAccountContext';
import {checkOutAccountContext} from '../checkOutAccount/checkOutAccountContext';
import {authContext} from '../../../login/authContext';
import {errorServerContext} from '../../../error/errorServerContext';

import { 
          LOADING_FINSIH_PURCHASE,
        } from "./finishPurchaseType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const FinishPurchaseProvider = ({ children }: props) => {
  
  const { subtotal, total, discount } = useContext(docAccountContext);
  const { checkout_payed, checkout_change  } = useContext(checkOutAccountContext);
  const { productListRegisterBox, client } = useContext(registerBoxContext);
  const { paymentMadeList } = useContext(paymentMadeContext);
  const { currency } = useContext(currencyContext);
  
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { logOut } = useContext(authContext);
  
  const initialState = {
    loadingDocumentInfo: false ,
  };
  const [state, dispatch] = useReducer(finishPurchaseReducer, initialState);
  
  async function finishPurchaseFn(){
    try {
      dispatch({type: LOADING_FINSIH_PURCHASE, loadingDocumentInfo: true})
      const resp = await customAxios.post("/document/create/bill", {
        client: client,
        currency_day_value: currency.today_currency,
        subtotal: subtotal,
        discount: discount,
        total: total,
        total_payed: checkout_payed,
        change: checkout_change,
        productList: productListRegisterBox,
        paymentMadeList: paymentMadeList,
      })
      dispatch({type: LOADING_FINSIH_PURCHASE, loadingDocumentInfo: false})
      
      saveErrorFromServerFn(false);
    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      // dispatch({type: NPAYMENTS_ERROR});
      // dispatch({ type: LOADING_GET_NPAYMENTS, loadingNatPayments: false })
      console.log(error);

      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      }else {
        saveErrorFromServerFn(true);

      }
    }
  }

  // function cleanCheckOutAccountFn(){
  //   dispatch({type: CLEAN_CHECKOUT_ACCOUNT,})
  // }

  return (
    <finishPurchaseContext.Provider
      value={{
        loadingDocumentInfo: state.loadingDocumentInfo,
        finishPurchaseFn,
      }}
    >
      {children}
    </finishPurchaseContext.Provider>
  );
};

export default FinishPurchaseProvider;