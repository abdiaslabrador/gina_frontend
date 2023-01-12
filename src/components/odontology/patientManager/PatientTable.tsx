import {  Loading, } from "@nextui-org/react";
import React, { Fragment, useContext } from "react";
import patientTableCss from "./PatientTable.module.css";
import { PatientInf } from "../../../interface/odontology/patientInf";
import DeletePatient from "./DeletePatient";
import CreatePatient from "./CreatePatient";
import UpdatePatient from "./UpdatePatient";
import { patientContext } from "../../../context/odontology/patientManager/patientContext";
import moment from "moment";

const PatientTable = () => {
    const {  patientList, loadingPatientList, selectedPatient, setSelectedPatientFn } = useContext(patientContext);

    function objectSelection(patient: PatientInf): void {
      setSelectedPatientFn(patient);
    }


  return (
    <Fragment>
              <div className={patientTableCss["create_modify_bottom"]}>
                <CreatePatient/>
                <UpdatePatient/>
              </div> 
              <div className={patientTableCss["product_list"]}>
                <div className={patientTableCss["product_list__titles"]}>
                  <div>ID</div>
                  <div>Nombre</div>
                  <div>Apellido</div>
                  <div>Nació</div>
                  <div>Dirección</div>
                </div>
                <Fragment>
                {(!loadingPatientList)?(
                 <div className={patientTableCss["product_list__products"]}> 
                    {(patientList?.length > 0) ? 
                      (<Fragment>
                        {patientList.map((patient, index) => (
                          <div
                            key={index}
                            style={
                              patient.id === selectedPatient?.id
                                ? { backgroundColor: "#313030" }
                                : {}
                            }
                            className={patientTableCss["product_list__item"]}
                            onClick={() => objectSelection(patient)}
                          >
                            <div className={patientTableCss["id"]}>{patient.ci_rif}</div>
                            <div className={patientTableCss["name"]}>{patient.name}</div>
                            <div className={patientTableCss["last_name"]}>{patient.last_name}</div>
                            <div className={patientTableCss["birthday"]}>{moment(patient.birthday).format("DD-MM-YYYY")}</div>
                            <div className={patientTableCss["direction"]}>{patient.direction}</div>
                          </div>
                        ))}
                      </Fragment>
                      ):
                      <h4>No hay pacientes</h4>
                    }
                  </div>
                           ) :
                  <div className={patientTableCss["center_loading"]}>
                    <Loading
                    type="spinner"
                    color="white"
                    size="xl"
                    /> 
                  </div>
                } 
                </Fragment>
              </div>
              
                <div className={patientTableCss["delete_bottom"]}>
                  <DeletePatient/>
                </div>
             
         
    </Fragment>
  );
};

export default PatientTable;