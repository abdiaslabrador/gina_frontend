import { Modal, Loading } from "@nextui-org/react";
import React, { Fragment, useEffect, useContext, useState } from "react";
import patientCss from "./PatientManager.module.css";
import sidebarCss from "../sidebar/SidebarOdontology.module.css";
import PatientTable from "./PatientTable";
// import {patientContext} from "../../../context/odontology/patientManager/patientContext";
import PatientProvider from "../../../context/odontology/patientManager/patientState";
import SearchFormPatient from "./SearchFormPatient";
// import { authContext } from "../../../context/login/authContext";
// import { employeeContext } from "../../../context/configuration/employee/employeeContext";

const PatientManager = () => {
    
    // const { user } = useContext(authContext);
    // const { user, userAuthenticated } = useContext(authContext);
    // const { selectedEmployee, employeeList, loadingEmployee, getEmployeesFn, setSelectedEmployeeFn } = useContext(patientContext);
    // const [loadingDataSentence, setLoadingDataSentence] = useState<string>("Cargando datos...");

    const [visible, setVisible] = React.useState(false);

  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
    // useEffect(()=>{
      
    //     const loadEmployees = async () =>{
    //         await getEmployeesFn();
    //     }
    //   loadEmployees();
    
    // },[])
  
    // function objectSelection(employee: EmployeeInf): void {
    //   setSelectedEmployeeFn(employee);
    // }


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
            <h3 className={patientCss["title"]}>Pacientes</h3>
          </Modal.Header>
          <Modal.Body>
            <PatientProvider>
              <SearchFormPatient/>
              <PatientTable/>
            </PatientProvider>
          </Modal.Body>
        </Modal>



         

              
              {/* <div className={patientCss["create_modify_bottom"]}>
                <CreateEmployee/>
                {employeeList?.length > 0 ? (<UpdateEmployee/>) : null}
              </div> */}

              {/* <div className={patientCss["product_list"]}>
                <div className={patientCss["product_list__titles"]}>
                  <div>ID</div>
                  <div>Nombre</div>
                  <div>Apellido</div>
                  <div>Nació</div>
                  <div>Dirección</div>
                </div> */}
                {/* <div className={patientCss["product_list__products"]}>
                
                  {(!loadingEmployee)?(
                    <Fragment>
                  {(employeeList?.length > 0 )?(
                    <Fragment>
                    {employeeList.map((employee, index) => (
                      <div
                        key={index}
                        style={
                          employee.id === selectedEmployee?.id
                            ? { backgroundColor: "#313030" }
                            : {}
                        }
                        className={patientCss["product_list__item"]}
                        onClick={() => objectSelection(employee)}
                      >
                        <div className={patientCss["ci"]}>{employee.ci_rif}</div>
                        <div className={patientCss["name"]}>{employee.name}</div>
                        <div className={patientCss["last_name"]}>
                          {employee.last_name}
                        </div>
                        <div className={patientCss["active"]}>
                          {employee.active ? "SI" : "NO"}
                        </div>
                        <div className={patientCss["secretary"]}>
                          {employee.secretary ? "SI" : "NO"}
                        </div>
                        <div className={patientCss["superuser"]}>
                          {employee.superuser ? "SI" : "NO"}
                        </div>
                      </div>
                    ))}
                    </Fragment>
                  ):
                    (<h1>No hay empleados</h1>)}
                  </Fragment>
                  ):
                  (
                    <div className={patientCss["center_loading"]}>
                      <Loading
                      type="spinner"
                      color="white"
                      size="xl"
                      /> 
                    </div>
                  )}
                    
                </div> */}
              {/* </div> */}
              {/* <div className={patientCss["delete_bottom"]}>
              {employeeList?.length > 0 ? (<DeleteEmployee/>) : null}
              </div> */}
            
    </Fragment>
  );
};

export default PatientManager;