import React, {Fragment, useContext, useState} from "react";
import { Modal, Button } from "@nextui-org/react";
// import customAxios from "../../../config/axios";
import { Loading } from "@nextui-org/react";
import { appointmentContext } from "../../../../context/odontology/work_table/appointment/appointmentContext";

const DeleteAppointment = () => {
  const { loadingFormAppointment, deleteAppointmentFn } = useContext(appointmentContext);
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState(
    "¿Estas seguro de eliminar la consulta?"
  );
  
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const deleteAppointment = async () => {
      await deleteAppointmentFn()
      setVisible(false);
  };

  return (
    <Fragment>
      <button
            type="button"
            className="button_form__button button_form__button--efect"
            onClick={handler}
            >
            {
            (!loadingFormAppointment) ? 
            <span>Eliminar</span>  
            : 
            (<Loading
                type="spinner"
                color="currentColor"
                size="sm"
            />)
            }
        </button>

      <Modal
        closeButton={!loadingFormAppointment}
        preventClose
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        {/* <Modal.Header>
            
        </Modal.Header> */}
        <Modal.Body>
          {loadingFormAppointment ?
            ( <Loading /> )
            : 
            (<div>{mensaje}</div>)
          }
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={() => deleteAppointment()} disabled={loadingFormAppointment}>
              Si
            </Button>
            <Button auto onClick={closeHandler} disabled={loadingFormAppointment}>
              No
            </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default DeleteAppointment;
