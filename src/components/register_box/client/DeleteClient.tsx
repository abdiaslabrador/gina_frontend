import React, {useContext} from "react";
import { Modal, Button } from "@nextui-org/react";
import { Loading } from "@nextui-org/react";
import {clientContext} from "../../../context/register_box/client/clientContext";

const DeleteClient = () => {
  const { loadingForm, selectedClient, deleteClientFn } = useContext(clientContext);
  const [visible, setVisible] = React.useState(false);
  const [mensaje, setMensaje] = React.useState(
    "¿Estas seguro de eliminar el cliente?"
  );
  
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const eliminarEmployee = async () => {
      await deleteClientFn(selectedClient.id)
      setVisible(false);
  };

  return (
    <div>
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
        disabled={selectedClient.id ? false : true}
      >
        Eliminar
      </button>

      <Modal
        closeButton={!loadingForm}
        preventClose
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        {/* <Modal.Header>
            
        </Modal.Header> */}
        <Modal.Body>
          {(loadingForm) ? ( <Loading /> ) : (<div>{mensaje}</div>)}
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={() => eliminarEmployee()} disabled={loadingForm}>
              Si
            </Button>

            <Button auto onClick={closeHandler} disabled={loadingForm}>
              No
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteClient;
