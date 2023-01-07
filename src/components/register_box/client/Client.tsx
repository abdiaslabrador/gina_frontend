import React, {Fragment, } from "react";
import { Modal, } from "@nextui-org/react";
import cajaCss from "../register_box/Caja.module.css";
import clientCss from './Client.module.css'
import SearchFormClient from "./SearchFormClient";
import ClientTable from "./ClientTable";
import ClientProvider from "../../../context/register_box/client/clientState";

const Client = () => {
  const [visible, setVisible] = React.useState(false);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
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