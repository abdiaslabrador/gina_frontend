import React, {useContext} from "react";
import { useReducer } from "react";
import customAxios from "../../../../config/axios";
import checkOutInfReducer from "./checkOutAccountReducer";
import {checkOutAccountContext} from "./checkOutAccountContext";
import {paymentMadeContext} from "../paymentMade/paymentMadeContext";
import {currencyContext} from '../../currency/currencyContext';
import {docAccountContext} from '../../documentAccount/docAccountContext';
import {authContext} from '../../../login/authContext';
import {errorServerContext} from '../../../error/errorServerContext';

import { 
         UPDATE_CHECKOUT_ACCOUNT,
         CLEAN_CHECKOUT_ACCOUNT
        } from "./checkOutAccountType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const CheckOutAccountProvider = ({ children }: props) => {
  
  const { total } = useContext(docAccountContext);
  const { currency } = useContext(currencyContext);
  const { paymentMadeList } = useContext(paymentMadeContext);
  
  // const { saveErrorFromServerFn } = useContext(errorServerContext);
  // const { logOut } = useContext(authContext);
  
  const initialState = {
    checkout_payed: 0 ,
    checkout_dolares: 0 ,
    checkout_balance: 0 ,
    checkout_change: 0 ,
  };
  const [state, dispatch] = useReducer(checkOutInfReducer, initialState);
  
  function cleanCheckOutAccountFn(){
    dispatch({type: CLEAN_CHECKOUT_ACCOUNT,})

  }

  function updateCheckOutAccountFn(){
    let payedAmount : number = 0;
    let dolaresAmount : number = 0;
    let balanceAmount : number = 0;
    let changeAmount : number = 0;

    paymentMadeList.forEach((payment : any) =>{
      payedAmount = payedAmount + payment.amount;
    })
    balanceAmount = total - payedAmount;
    dolaresAmount = balanceAmount / currency.today_currency;
    if(balanceAmount < 0){
      changeAmount =   Math.abs(balanceAmount);
    }

    dispatch({type: UPDATE_CHECKOUT_ACCOUNT, 
      checkout_payed: Number(payedAmount.toFixed(2)) ,
      checkout_dolares: Number(dolaresAmount.toFixed(2)) ,
      checkout_balance: Number(balanceAmount.toFixed(2)) ,
      checkout_change: Number(changeAmount.toFixed(2)) 
    })
  }

  return (
    <checkOutAccountContext.Provider
      value={{
        checkout_payed: state.checkout_payed,
        checkout_dolares: state.checkout_dolares,
        checkout_balance: state.checkout_balance,
        checkout_change: state.checkout_change,
        updateCheckOutAccountFn,
        cleanCheckOutAccountFn,
      }}
    >
      {children}
    </checkOutAccountContext.Provider>
  );
};

export default CheckOutAccountProvider;