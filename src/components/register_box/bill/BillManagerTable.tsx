import {  Loading, } from "@nextui-org/react";
import React, { Fragment, useEffect, useContext, useState } from "react";
import billTableCss from "./BillManagerTable.module.css";
import { billContext } from "../../../context/register_box/bill/billContext";
import { BillInf } from "../../../interface/billInf";
import SelectBill from "./selectBill/SelectBill";
import CancelBill from "./CancelBill";
import moment from "moment";


const BillManagerTable = () => {
    const { billList,
            selectedBill,
            loadingBillList, 
            setSelectedBillFn,
          } = useContext(billContext);
    
    function objectSelection(bill: BillInf): void {
      setSelectedBillFn(bill);
    }


  return (
    <Fragment>
              <div className={billTableCss["pickup_botton"]}>
                <SelectBill/>
              </div>

              <div className={billTableCss["product_list"]}>
                <div className={billTableCss["product_list__titles"]}>
                  <div>Fecha</div>
                  <div>Número</div>
                  <div>Monto</div>
                  <div>Estado</div>
                </div>
                <Fragment>
                { (!loadingBillList)?(
                 <div className={billTableCss["product_list__products"]}> 

                            {(billList?.length > 0) ? 
                                (<Fragment>
                                {billList.map((bill, index) => (
                                    <div
                                    key={index}
                                    style={
                                        bill.id === selectedBill?.id
                                        ? { backgroundColor: "#313030" }
                                        : {}
                                    }
                                    className={billTableCss["product_list__item"]}
                                    onClick={() => objectSelection(bill)}
                                    >
                                    <div className={billTableCss["bill_date"]}>{moment(bill?.docu?.document_date).format("DD-MM-YYYY")}</div>
                                    <div className={billTableCss["bill_id"]}>{bill.id}</div>
                                    <div className={billTableCss["amount"]}>{bill?.docu?.total}</div>
                                    <div className={billTableCss["state"]}>{bill?.docu?.canceled ? "cancelado": "activa"}</div>
                                    </div>
                                ))}
                                </Fragment>
                                ):
                                <h4>No hay facturas</h4>
                            }

                          </div>
                 ) :
                  <div className={billTableCss["center_loading"]}>
                    <Loading
                    type="spinner"
                    color="white"
                    size="xl"
                    /> 
                  </div>
                } 
                </Fragment>
              </div>
              
              <div className={billTableCss["delete_bottom"]}>
                <CancelBill/>
              </div> 
    </Fragment>
  );
};

export default BillManagerTable;