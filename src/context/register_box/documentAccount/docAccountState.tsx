import React, {useContext, useReducer} from "react";
import { useRouter } from "next/router";
import customAxios from "../../../config/axios";
import {errorServerContext} from '../../error/errorServerContext';
import {currencyContext} from '../../../context/register_box/currency/currencyContext';
import {registerBoxContext} from '../../../context/register_box/register_box/registerBoxContext';
import {authContext} from '../../login/authContext';
import {ProductRegisterBoxInf} from "../../../interface/registerBoxInf";
import docAccountReducer from "./docAccountReducer";
import {docAccountContext} from './docAccountContext';
import {
  UPDATE_DISCOUNT,
  UPDATE_ACCOUNT,
  CLEAN_DOCUMENT_ACCOUNT,
  } from "./docAccountType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const DocumentAccountProvider = ({ children }: props) => {
  const { currency } = useContext(currencyContext);
  const { productListRegisterBox } = useContext(registerBoxContext);
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { logOut } = useContext(authContext);

  const initialState = {
    subtotal: 0 ,
    discount: 0 ,
    dolares: 0 ,
    total: 0 ,
  };

  const [state, dispatch] = useReducer(docAccountReducer, initialState);
  
 
  function setDiscountFn(discount : number){
    dispatch({
      type:UPDATE_DISCOUNT,
      discount: discount
    })
  }

  function cleanDocumentAccountFn(){
    dispatch({type:CLEAN_DOCUMENT_ACCOUNT,})
  }

  function updateDocAccountFn(){
    let subtotalAccount : number = 0;
    let dolaresAccount : number = 0;

    productListRegisterBox.forEach((product : ProductRegisterBoxInf) =>{
      subtotalAccount = subtotalAccount + product.subtotal;
    })
    dolaresAccount = (subtotalAccount -  state.discount) / currency.today_currency;

    dispatch({type:UPDATE_ACCOUNT, 
      subtotal: Number(subtotalAccount.toFixed(2)),
      dolares: Number(dolaresAccount.toFixed(2)),
      total:  Number((subtotalAccount - state.discount).toFixed(2))
    })
  }
  
  return (
    <docAccountContext.Provider
      value={{
        subtotal: state.subtotal,
        discount: state.discount,
        dolares: state.dolares,
        total: state.total,
        updateDocAccountFn,
        setDiscountFn,
        cleanDocumentAccountFn
      }}
    >
      {children}
    </docAccountContext.Provider>
  );
};

export default DocumentAccountProvider;
