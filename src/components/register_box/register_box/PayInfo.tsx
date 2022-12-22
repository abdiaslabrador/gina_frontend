import React, {Fragment, useEffect, useContext} from "react";
import customAxios from "../../../config/axios";
import { Loading } from "@nextui-org/react";
import { registerBoxContext } from "../../../context/register_box/register_box/registerBoxContext";
import { currencyContext } from "../../../context/register_box/currency/currencyContext";
import cajaCss from "./Caja.module.css";
import payInfoCss from "./PayInfo.module.css";

const PayInfo = () => {
  const { subtotal, discount, dolares, total, productListRegisterBox, updateAccountFn} = useContext( registerBoxContext );
  const { loadingCurrency, currency } = useContext( currencyContext );
  
  useEffect(()=>{
    if(currency){
      updateAccountFn();
    }
  },[productListRegisterBox])
  
  return (
    <Fragment>
        {(!loadingCurrency)?
          <div className={cajaCss["pay_info"]}>
          <div className={cajaCss["pay_info__title"]}>Sub-total</div>
          <div className={cajaCss["pay_info__count"]}>{subtotal}</div>
          <div className={cajaCss["pay_info__title"]}>Descuento</div>
          <div className={cajaCss["pay_info__count"]}>{discount}</div>
          <div
            className={`${cajaCss["pay_info__title"]} ${cajaCss["pay_info__title--aling"]}`}
          >
            Dolares
          </div>
          <div
            className={`${cajaCss["pay_info__count"]} ${cajaCss["pay_info__count--dollar"]}`}
          >
            {dolares}$
          </div>
          <div
            className={`${cajaCss["pay_info__title"]} ${cajaCss["pay_info__title--aling"]}`}
          >
            Total
          </div>
          <div
            className={`${cajaCss["pay_info__count"]} ${cajaCss["pay_info__count--total"]}`}
          >
            {total}
          </div>
        </div>
            :
            null
        }

        {(loadingCurrency)?
            <div className={payInfoCss["pay_info_loading"]}>
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

export default PayInfo;