import React, {Fragment, useState, useContext, useEffect} from "react";
import billProductsCss from "./BillPayments.module.css";
import { billContext } from "../../../../context/register_box/bill/billContext";

const BillPayments = () => {
  const { 
    selectedBill,
   } = useContext(billContext);

   return (
    <Fragment>
        <div className={billProductsCss["product_list"]}>
            <div className={billProductsCss["product_list__titles"]}>
              <div>Tipo</div>
              <div>Moneda</div>
              <div>Monto $</div>
              <div>Monto Bs</div>
              <div>Detalle</div>
            </div>
            <div className={billProductsCss["product_list__products"]}>
                {(selectedBill.docu?.docu_payments?.length > 0)? ( 
                    <Fragment>
                    {selectedBill.docu.docu_payments.map((docu_payment : any) => (
                        <div
                            key={docu_payment.id}
                            className={billProductsCss["product_list__item"]}
                        >
                            <div className={billProductsCss["type"]}>{docu_payment?.payment?.name}</div>
                            <div className={billProductsCss["currency_name"]}>{docu_payment?.payment?.currency?.name}</div>
                            <Fragment>
                                {
                                  (docu_payment?.currency_amount)?
                                  (<div className={billProductsCss["currency_amount"]}>{docu_payment?.currency_amount}</div>):
                                  (<div className={billProductsCss["currency_amount"]}>N/A</div>)
                                }
                              </Fragment>
                            <div className={billProductsCss["amount"]}>{docu_payment?.amount}</div>
                            <div className={billProductsCss["detail"]}>{docu_payment?.detail}</div>
                        </div>
                    ))}
                    </Fragment>
                ) :
                <h4 style={{color: "white"}}>No hay pagos</h4>
                }
            </div>
        </div>
    </Fragment>
  );
};

export default BillPayments;