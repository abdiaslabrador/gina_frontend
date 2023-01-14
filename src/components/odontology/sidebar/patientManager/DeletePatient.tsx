import React, {useContext} from "react";
import { Modal, Button } from "@nextui-org/react";
import customAxios from "../../../../config/axios";
import { Loading } from "@nextui-org/react";
import { patientManagerContext } from "../../../../context/odontology/patientManager/patientManagerContext";

const DeletePatient = () => {
  const { loadingPatientList, selectedPatient, deletePatientFn } = useContext(patientManagerContext);
  const [visible, setVisible] = React.useState(false);
  const [mensaje, setMensaje] = React.useState(
    "¿Estas seguro de eliminar el paciente?"
  );
  
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const eliminarPatient = async () => {
      await deletePatientFn(selectedPatient.id)
      setVisible(false);
  };

  return (
    <div>
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
        disabled={selectedPatient.id ? false : true}
      >
        Eliminar
      </button>

      <Modal
        closeButton={!loadingPatientList}
        preventClose
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        {/* <Modal.Header>
            
        </Modal.Header> */}
        <Modal.Body>
          {loadingPatientList ?
            ( <Loading /> )
            : 
            (<div>{mensaje}</div>)
          }
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={() => eliminarPatient()} disabled={loadingPatientList}>
              Si
            </Button>
            <Button auto onClick={closeHandler} disabled={loadingPatientList}>
              No
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeletePatient;
