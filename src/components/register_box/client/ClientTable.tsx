import {  Loading, } from "@nextui-org/react";
import React, { Fragment, useContext } from "react";
import clientTableCss from "./ClientTable.module.css";
import { ClientInf } from "../../../interface/clientInf";
import DeleteClient from "./DeleteClient";
import CreateClient from "./CreateClient";
import UpdateClient from "./UpdateClient";
import { clientContext } from "../../../context/register_box/client/clientContext";

const ClientTable = () => {
    const {  selectedClient, clientList, loadingForm, setSelectedClientFn } = useContext(clientContext);

    function objectSelection(client: ClientInf): void {
      setSelectedClientFn(client);
    }


  return (
    <Fragment>
                <div className={clientTableCss["create_modify_bottom"]}>
                  <CreateClient/>
                  <UpdateClient/>
                </div> 
             

              <div className={clientTableCss["product_list"]}>
                <div className={clientTableCss["product_list__titles"]}>
                  <div>Cédula</div>
                  <div>Nombre</div>
                  <div>Apellido</div>
                </div>
                <Fragment>
                  {
                    (!loadingForm)?(
                 <div className={clientTableCss["product_list__products"]}> 

                    {(clientList?.length > 0) ? 
                      (<Fragment>
                        {clientList.map((client, index) => (
                          <div
                            key={index}
                            style={
                              client.id === selectedClient?.id
                                ? { backgroundColor: "#313030" }
                                : {}
                            }
                            className={clientTableCss["product_list__item"]}
                            onClick={() => objectSelection(client)}
                          >
                            <div className={clientTableCss["ci"]}>{client.ci_rif}</div>
                            <div className={clientTableCss["name"]}>{client.name}</div>
                            <div className={clientTableCss["last_name"]}>{client.last_name}</div>
                          </div>
                        ))}
                      </Fragment>
                      ):
                      (null)
                    }
                          </div>
                          ) :
                  <div className={clientTableCss["center_loading"]}>
                  <Loading
                  type="spinner"
                  color="white"
                  size="xl"
                  /> 
                  </div>
                }
                </Fragment>
              </div>
              
                <div className={clientTableCss["delete_bottom"]}>
                  <DeleteClient/>
                </div> 
             
         
    </Fragment>
  );
};

export default ClientTable;