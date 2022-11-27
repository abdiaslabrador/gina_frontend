import React, {useContext} from "react";
import { Modal, Button } from "@nextui-org/react";
import {EmployeeInf} from "../../../interface/EmployeeInf";
import deleteEmployeeCss from "./DeleteEmployee.module.css";
import customAxios from "../../../config/axios";
import { Loading } from "@nextui-org/react";
import { employeeContext } from "../../../context/employee/employeeContext";

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
    try {
      await deleteEmployeeFn(selectedEmployee.id)
      setVisible(false);
    } catch (error: any) {
      console.log(error);
      let errorMessage = error.response.data?.msg || error.message;
      // if (error.response?.status == "404") {
      //   const resp = await customAxios.get("/employee/all");
      //   setEmployeeList(resp.data);
      //   setSelectedEmployee({} as EmployeeInf);
      //   setLoading(false);
      //   setVisible(false);
      // } else {
      //   setSelectedEmployee({} as EmployeeInf);
      //   setLoading(false);
      //   setMensaje(errorMessage);
      // }
    }
  };

  return (
    <div>
      <button
        className={deleteEmployeeCss["buttom_form__buttom"]}
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
        <Modal.Body>{loadingForm ?
        ( <Loading /> )
        : 
        (<div>{mensaje}</div>)
        }</Modal.Body>
        <Modal.Footer>
          {loadingForm ? (
            <Button
              disabled
              auto
              flat
              color="error"
              onClick={() => eliminarEmployee()}
            >
              Si
            </Button> //con disable
          ) : (
            <Button auto flat color="error" onClick={() => eliminarEmployee()}>
              Si
            </Button>
          )}

          {loadingForm ? (
            <Button auto onClick={closeHandler} disabled>
              No
            </Button> //sin disable
          ) : (
            <Button auto onClick={closeHandler}>
              No
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteEmployee;
