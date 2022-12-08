import React, {Fragment, useContext, useEffect, useState} from "react";
import { Modal, Loading } from "@nextui-org/react";
import cajaCss from "../../../styles/Caja.module.css";
import clientCss from './Client.module.css'
import { useRouter } from "next/router";
import { authContext } from "../../../context/login/authContext";
import SearchFormClient from "./SearchFormClient";
import ClientTable from "./ClientTable";
import ClientProvider from "../../../context/register_box/client/clientState";

const Client = () => {
  const router = useRouter();
  const [ showEmployeeSystem, setshowEmployeeSystem ] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <Fragment>
        <div 
            className={cajaCss["options__items"]}
            onClick={handler}
        >
            <i className="fa-solid fa-user"></i>
        </div>
        <Modal
        animated={false}
        width="800px"
        css={{ height: "600px", backgroundColor: "#302F2F" }}
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        >
          <Modal.Header>
          
            <h3 className={clientCss["title"]}>
              Clientes
            </h3>
          
        </Modal.Header>
            <Modal.Body>
                <div className={clientCss["main"]}>
                  <ClientProvider>
                    <SearchFormClient/>
                    <ClientTable/>
                  </ClientProvider>
                </div>
            </Modal.Body>
        </Modal>
    </Fragment>
  );
};

export default Client;