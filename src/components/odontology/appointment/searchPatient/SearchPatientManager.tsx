import { Modal, Loading } from "@nextui-org/react";
import React, { Fragment, useEffect, useContext, useState } from "react";
import PatientTable from "../../sidebar/patientManager/PatientTable";
import SearchFormPatient from "../../sidebar/patientManager/SearchFormPatient";
import searchCss from './SearchPatientManager.module.css';
import { patientContext } from "../../../../context/odontology/patient/patientContext";
import { patientManagerContext } from "../../../../context/odontology/patientManager/patientManagerContext";
import { appointmentContext } from "../../../../context/odontology/work_table/appointment/appointmentContext";

const searchPatientManager = () => {
  const { setPatientFn } = useContext( patientContext );
  const { loadingFormAppointment } = useContext( appointmentContext );
  
  const { selectedPatient, cleanPatientsFn } = useContext( patientManagerContext );
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    cleanPatientsFn();
    setVisible(false);
  };

  function setPatient(){
    setPatientFn(selectedPatient);
    closeHandler();
  }
  return (
    <Fragment>
        <button
          className="button_form__button button_form__button--efect"
          onClick={handler}
          disabled={loadingFormAppointment }
        >
          Buscar paciente
        </button>
        
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
            <h3 className={searchCss["title"]}>Buscador de pacientes</h3>
          </Modal.Header>
          <Modal.Body>
              <SearchFormPatient/>
              <div className={searchCss["pickup_botton"]}>
                <button
                  className="button_form__button button_form__button--efect"
                  onClick={setPatient}
                  disabled={(selectedPatient.id ? false : true)}
                >
                  Seleccionar
                </button>
              </div>
              <PatientTable/>
          </Modal.Body>
        </Modal>
    </Fragment>
  );
};

export default searchPatientManager;