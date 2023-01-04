import React, {useContext, useReducer} from "react";
import paymentMadeReducer from "./paymentMadeReducer";
import {natPaymentContext} from "../nationalPayment/natPaymentContext";
import {foreignPaymentContext} from "../foreignPayment/foreignPaymentContext";
import {paymentMadeContext} from "./paymentMadeContext";
import {PaymentMadeInf} from "../../../../interface/checkOut/paymentMadeInf";

import {
    ADD_PAYMENTMADE,
    SET_SELECTED_PAYMENTMADE,
    DELETE_PAYMENTMADE,
    CLEAN_PAYMENTMADE
  } from "./paymentMadeType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const PaymentMadeProvider = ({ children }: props) => {
  const { selectedNatPayment } = useContext(natPaymentContext);
  const { selectedForeignPayment } = useContext(foreignPaymentContext);

  const initialState = {
    paymentMadeList: [],
    selectedPaymentMade: null,
  };

  const [state, dispatch] = useReducer(paymentMadeReducer, initialState);
  
  function addNationalPayment(amount : number, detail : string){
    const paymentMade : PaymentMadeInf = {
      payment_date : new Date(),
      currency_name : selectedNatPayment.currency.name,
      currency_amount : null,
      currency_day_value : null,
      amount : amount,
      detail : detail,
      paymentType_id: selectedNatPayment.id,
      paymentType_name : selectedNatPayment.name,
    }

    dispatch({
      type: ADD_PAYMENTMADE,
      paymentMadeList: [...state.paymentMadeList, paymentMade]
    })
  }

  function addForeignPayment(currency_amount : number, detail : string){
    const paymentMade : PaymentMadeInf = {
      payment_date : new Date(),
      currency_name : selectedForeignPayment.currency.name,
      currency_amount : currency_amount,
      currency_day_value : selectedForeignPayment.currency.today_currency,
      amount : Number((currency_amount * selectedForeignPayment.currency.today_currency).toFixed(2)),
      detail : detail,
      paymentType_id: selectedForeignPayment.id,
      paymentType_name : selectedForeignPayment.name,
    }

    dispatch({
      type: ADD_PAYMENTMADE,
      paymentMadeList: [...state.paymentMadeList, paymentMade]
    })
  }
  
  function cleanPaymentMadeFn(){
    dispatch( {type: CLEAN_PAYMENTMADE} )
  }

  function setSelectedPaymentMadeFn(payment : PaymentMadeInf){
    dispatch({
      type: SET_SELECTED_PAYMENTMADE,
      selectedPaymentMade: payment
    })
  }

  function deletePaymentMadeFn(payment_date : Date){
    dispatch({type:DELETE_PAYMENTMADE, 
      paymentMadeList: state.paymentMadeList.filter( (paymentMade : any ) => paymentMade.payment_date != payment_date),
      selectedPaymentMade: null,
    })
  }

  return (
    <paymentMadeContext.Provider
      value={{
        paymentMadeList: state.paymentMadeList,
        selectedPaymentMade: state.selectedPaymentMade,
        addNationalPayment,
        addForeignPayment,
        setSelectedPaymentMadeFn,
        deletePaymentMadeFn,
        cleanPaymentMadeFn
      }}
    >
      {children}
    </paymentMadeContext.Provider>
  );
};

export default PaymentMadeProvider;
