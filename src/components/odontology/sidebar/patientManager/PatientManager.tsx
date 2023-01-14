import { Modal, Loading } from "@nextui-org/react";
import React, { Fragment, useEffect, useContext, useState } from "react";
import patientCss from "./PatientManager.module.css";
import sidebarCss from "../SidebarOdontology.module.css";
import PatientTable from "./PatientTable";
import PatientManagerProvider from "../../../../context/odontology/patientManager/patientManagerState";
import SearchFormPatient from "./SearchFormPatient";
import CreatePatient from "./CreatePatient";
import UpdatePatient from "./UpdatePatient";
import DeletePatient from "./DeletePatient";

const PatientManager = () => {
    
  const [visible, setVisible] = React.useState(false);

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <Fragment>
      <div 
            className={sidebarCss["sidebar__item"]}
            onClick={handler}
        >
            <i className="fa-solid fa-users-gear"></i>
        </div>
        
        <Modal
        animated={false}
        width="1000px"
        css={{ height: "600px", backgroundColor: "#302F2F" }}
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        >
          <Modal.Header>
            <h3 className={patientCss["title"]}>Gestor de pacientes</h3>
          </Modal.Header>
          <Modal.Body>
            <PatientManagerProvider>
              <SearchFormPatient/>
              <div className={patientCss["create_modify_bottom"]}>
                <CreatePatient/>
                <UpdatePatient/>
              </div> 
              <PatientTable/>
              <div className={patientCss["delete_bottom"]}>
                <DeletePatient/>
              </div>
            </PatientManagerProvider>
          </Modal.Body>
        </Modal>
    </Fragment>
  );
};

export default PatientManager;