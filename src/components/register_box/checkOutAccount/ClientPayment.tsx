import React, {Fragment, useEffect, useContext} from "react";
import customAxios from "../../../config/axios";
import { Loading } from "@nextui-org/react";
import { currencyContext } from "../../../context/register_box/currency/currencyContext";
import clientPayment from "./ClientPayment.module.css";
import { checkOutAccountContext } from "../../../context/register_box/checkOut/checkOutAccount/checkOutAccountContext";
import { paymentMadeContext } from "../../../context/register_box/checkOut/paymentMade/paymentMadeContext";
import { docAccountContext } from "../../../context/register_box/documentAccount/docAccountContext";

const ClientPayment = () => {
  const { total } = useContext( docAccountContext );
  const { checkout_payed, checkout_dolares, checkout_balance, checkout_change, updateCheckOutAccountFn, } = useContext( checkOutAccountContext );
  const { loadingCurrency, currency } = useContext( currencyContext );
  const { paymentMadeList } = useContext( paymentMadeContext );
  
  useEffect(()=>{
    if(currency){
      updateCheckOutAccountFn();
    }
  },[total, paymentMadeList])
  
  return (
    <Fragment>
        {(!loadingCurrency)?
          <div className={clientPayment["client_payment"]}>
          <div className={clientPayment["client_payment__title"]}>pagado</div>
          <div className={clientPayment["client_payment__count"]}>{checkout_payed}</div>
          <div
            className={`${clientPayment["client_payment__title"]} ${clientPayment["client_payment__title--aling"]} ${clientPayment["client_payment__title--bigfont"]}`}
          >
            Dolares
          </div>
          <div
            className={`${clientPayment["client_payment__count"]} ${clientPayment["client_payment__count--dollar"]}`}
          >
            {checkout_dolares}$
          </div>
          <div
            className={`${clientPayment["client_payment__title"]} ${clientPayment["client_payment__title--aling"]} ${clientPayment["client_payment__title--bigfont"]}`}
          >
            Saldo
          </div>
          <div
            className={`${clientPayment["client_payment__count"]} ${clientPayment["client_payment__count--total"]}`}
          >
            {checkout_balance}
          </div>
          <div className={clientPayment["client_payment__title"]}>Cambio</div>
          <div className={clientPayment["client_payment__count"]}>{checkout_change}</div>
          
        </div>
            :
            null
        }

        {(loadingCurrency)?
            <div className={clientPayment["pay_info_loading"]}>
                <div className={"center_loading"}>
                    <Loading
                        type="spinner"
                        color="white"
                        size="sm"
                    />   
                </div>
            </div>
            :
            null
        }
    </Fragment>
  );
};

export default ClientPayment;