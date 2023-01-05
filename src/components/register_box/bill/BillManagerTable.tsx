import {  Loading, } from "@nextui-org/react";
import React, { Fragment, useEffect, useContext, useState } from "react";
import billTableCss from "./BillManagerTable.module.css";
// import { clientContext } from "../../../context/register_box/client/clientContext";

const BillManagerTable = () => {
    // const {  selectedClient, clientList, loadingForm, setSelectedClientFn } = useContext(clientContext);

    // function objectSelection(client: ClientInf): void {
    // //   setSelectedClientFn(client);
    // }


  return (
    <Fragment>
                <div className={billTableCss["pickup_botton"]}>
                <button
                    className="button_form__button button_form__button--efect"
                    // onClick={handler}
                    // disabled={selectedProduct.id ? false : true}
                >
                    Seleccionar
                </button>
                {/* <SelectProduct/> */}
                </div>
             

              <div className={billTableCss["product_list"]}>
                <div className={billTableCss["product_list__titles"]}>
                  <div>Fecha</div>
                  <div>Código</div>
                  <div>Monto</div>
                  <div>Estado</div>
                  <div>Detalle</div>
                </div>
                <Fragment>
                  {/* {(!loadingForm)?( */}
                 <div className={billTableCss["product_list__products"]}> 

                            {/* {(clientList?.length > 0) ? 
                                (<Fragment>
                                {clientList.map((client, index) => (
                                    <div
                                    key={index}
                                    style={
                                        client.id === selectedClient?.id
                                        ? { backgroundColor: "#313030" }
                                        : {}
                                    }
                                    className={billTableCss["product_list__item"]}
                                    onClick={() => objectSelection(client)}
                                    >
                                    <div className={billTableCss["ci"]}>{client.ci_rif}</div>
                                    <div className={billTableCss["name"]}>{client.name}</div>
                                    <div className={billTableCss["last_name"]}>{client.last_name}</div>
                                    </div>
                                ))}
                                </Fragment>
                                ):
                                (null)
                            } */}
                          </div>
                          {/* ) :
                  <div className={billTableCss["center_loading"]}>
                  <Loading
                  type="spinner"
                  color="white"
                  size="xl"
                  /> 
                  </div>
                } */}
                </Fragment>
              </div>
              
                <div className={billTableCss["delete_bottom"]}>
                <button
                    className="button_form__button button_form__button--efect"
                    // onClick={handler}
                    // disabled={selectedProduct.id ? false : true}
                >
                    Anular
                </button>
                 {/* <DeleteClient/> */}
                </div> 
             
         
    </Fragment>
  );
};

export default BillManagerTable;