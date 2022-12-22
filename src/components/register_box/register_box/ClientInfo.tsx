import React, {Fragment, useContext} from "react";
import customAxios from "../../../config/axios";
import { Loading } from "@nextui-org/react";
import { registerBoxContext } from "../../../context/register_box/register_box/registerBoxContext";
import cajaCss from "./Caja.module.css";

const ClientInfo = () => {
  const { client, loadingClient } = useContext( registerBoxContext );

  return (
    <Fragment>
        {(!loadingClient)?
          <div className={cajaCss["client_info"]}>
            <div className={cajaCss["client_info__title"]}>Factura</div>
            <div className={cajaCss["client_info__content"]}>
                {(client)? 
                  <Fragment>
                    <div>Cliente: {client.name} {client.last_name}</div>
                    <div>Rif: {client.ci_rif}</div>
                    <div>Dirección: {client.direction}</div>
                    <div>Factura: 22753</div>
                  </Fragment> : 
                  <Fragment>
                    <div>No hay cliente</div>
                  </Fragment>
                }
            </div>
            </div>
            :
            null
        }

        {(loadingClient)?
            <div className={cajaCss["client_info"]}>
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

export default ClientInfo;
