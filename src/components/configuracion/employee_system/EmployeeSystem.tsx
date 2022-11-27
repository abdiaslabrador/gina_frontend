import React, { useEffect, useContext, useState } from "react";
import { authContext } from "../../../context/login/authContext";
import employeeSystemCss from "./EmployeeSystem.module.css";
import {EmployeeInf} from "../../../interface/EmployeeInf";
import DeleteEmployee from "./DeleteEmployee";
import CreateEmployee from "./CreateEmployee";
import UpdateEmployee from "./UpdateEmployee";
import { employeeContext } from "../../../context/employee/employeeContext";

const EmployeeSystem = () => {
    const { user } = useContext(authContext);
    // const { user, userAuthenticated } = useContext(authContext);
    const { selectedEmployee, employeeList, getEmployeesFn, setSelectedEmployeeFn } = useContext(employeeContext);
    // const [loadingDataSentence, setLoadingDataSentence] = useState<string>("Cargando datos...");

    useEffect(()=>{
      if(Object.values(user).length > 0){
        const loadEmployees = async () =>{
            await getEmployeesFn();
        }
      loadEmployees();
    }
    },[user])
  
    function objectSelection(employee: EmployeeInf): void {
      setSelectedEmployeeFn(employee);
    }


  return (
    <div>
          {employeeList?.length > 0 ? (
            <div>
              <h1 className={employeeSystemCss["title"]}>Sistema de empleados</h1>
              <div className={employeeSystemCss["create_modify_bottom"]}>
                <CreateEmployee/>
                <UpdateEmployee/>
              </div>

              <div className={employeeSystemCss["product_list"]}>
                <div className={employeeSystemCss["product_list__titles"]}>
                  <div>Cédula</div>
                  <div>Nombre</div>
                  <div>Apellido</div>
                  <div>Activo</div>
                  <div>Secretario</div>
                  <div>Superusuario</div>
                </div>
                <div className={employeeSystemCss["product_list__products"]}>
                  {employeeList.map((employee, index) => (
                    <div
                      key={index}
                      style={
                        employee.id === selectedEmployee?.id
                          ? { backgroundColor: "#313030" }
                          : {}
                      }
                      className={employeeSystemCss["product_list__item"]}
                      onClick={() => objectSelection(employee)}
                    >
                      <div className={employeeSystemCss["ci"]}>{employee.ci_rif}</div>
                      <div className={employeeSystemCss["name"]}>{employee.name}</div>
                      <div className={employeeSystemCss["last_name"]}>
                        {employee.last_name}
                      </div>
                      <div className={employeeSystemCss["active"]}>
                        {employee.active ? "SI" : "NO"}
                      </div>
                      <div className={employeeSystemCss["secretary"]}>
                        {employee.secretary ? "SI" : "NO"}
                      </div>
                      <div className={employeeSystemCss["superuser"]}>
                        {employee.superuser ? "SI" : "NO"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={employeeSystemCss["delete_bottom"]}>
              <DeleteEmployee/>
              </div>
            </div>
          ) : (
            <h1>Cargando datos...</h1>
          )}
    </div>
  );
};

export default EmployeeSystem;