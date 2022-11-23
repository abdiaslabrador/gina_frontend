import React, { useContext } from "react";
import { Modal, Button } from "@nextui-org/react";
import EmployeeInf from "../../interface/EmployeeInf";
import customAxios from "../../config/axios";
import { Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import logoutCss from "./Logout.module.css";
import { authContext } from "../../context/login/authContext";

const Logout = () => {
  
  const { logOut } = useContext(authContext);
  const [visible, setVisible] = React.useState(false);
  
  const handler = () => setVisible(true);
  const router = useRouter();

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const cerraSesion = async () => {
    await logOut();
  };

  return (
    <div>
      <div className={logoutCss["sidebar__item"]} onClick={handler}>
        Cerrar sesión
      </div>

      <Modal
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body>
          <h2>¿Quiere cerrar sesión?</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => cerraSesion()}>
            Si
          </Button>
          <Button auto onClick={closeHandler}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Logout;
