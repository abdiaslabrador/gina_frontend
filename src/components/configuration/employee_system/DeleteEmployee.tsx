import React, {useContext} from "react";
import { Modal, Button } from "@nextui-org/react";
import customAxios from "../../../config/axios";
import { Loading } from "@nextui-org/react";
import { employeeContext } from "../../../context/configuration/employee/employeeContext";

const DeleteEmployee = () => {
  const { loadingForm, selectedEmployee, deleteEmployeeFn } = useContext(employeeContext);
  const [visible, setVisible] = React.useState(false);
  const [mensaje, setMensaje] = React.useState(
    "¿Estas seguro de eliminar el empleado?"
  );
  
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const eliminarEmployee = async () => {
      await deleteEmployeeFn(selectedEmployee.id)
      setVisible(false);
  };

  return (
    <div>
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
        disabled={selectedEmployee.id ? false : true}
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
          {loadingForm ?
            ( <Loading /> )
            : 
            (<div>{mensaje}</div>)
          }
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

export default DeleteEmployee;
