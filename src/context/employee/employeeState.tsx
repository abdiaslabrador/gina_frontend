import React, {useContext} from "react";
import { useRouter } from "next/router";
import { useReducer } from "react";
import employeeReducer from "./employeeReducer";
import customAxios from "../../config/axios";
// import {authContext} from './authContext';
import {employeeContext} from './employeeContext';
import {errorServerContext} from '../error/errorServerContext';
import EmployeeInf from "../../interface/EmployeeInf";
import {authContext} from '../login/authContext';

import {
    GET_EMPLOYEES,
    SET_SELECTED_EMPLOYEE,
    DELETE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    UPDATE_EMPLOYEE_PASSWORD,
    EMPLOYEES_ERROR
  } from "./employeeType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const EmployeeSettingsProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { logOut } = useContext(authContext);
  
  const router = useRouter();

  const initialState = {
    selectedEmployee : {} as EmployeeInf,
    employeeList : [],
    mensajeSuccess : null,
    mensajeError : null,
    // loadingDataSentence: ''
  };

  const [state, dispatch] = useReducer(employeeReducer, initialState);

  async function getEmployeesFn() {
      try {
        const response = await customAxios.get("/employee/all");
        dispatch({
          type: GET_EMPLOYEES,
          employeeList: response.data
        })
        saveErrorFromServerFn(false);
      } catch (error : any) {
        console.log(error);
        let message = error.response.data?.msg || error.message;
        if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          dispatch({
            type: EMPLOYEES_ERROR,
            employeeList: [],
            selectedEmployee: {} as EmployeeInf
            })
          await logOut();
        } else {
          saveErrorFromServerFn(true);
        }
      }
  }

  async function createEmployeeFn(employee: any){
    try {
      await customAxios.post("employee/create", {
        email: employee.email,
        name: employee.name,
        last_name: employee.last_name,
        ci_rif: employee.ci_rif,
        phone_number: employee.phone_number,
        direction: employee.direction,
        birthday: employee.birthday,
        active: employee.active,
        secretary: employee.secretary,
        superuser: employee.superuser,
        password: employee.password,
      });
      await getEmployeesFn()
    } catch (error) {
      console.log(error);
    }
  }

  function setSelectedEmployeeFn(employee: EmployeeInf) {
      dispatch({
        type: SET_SELECTED_EMPLOYEE,
        selectedEmployee: employee
      })
  }

  async function deleteEmployeeFn(employeId : number){
    try {
      const resp = await customAxios.post("/employee/delete", {
        id: employeId,
      });
      dispatch({
        type: DELETE_EMPLOYEE,
        employeeList: resp.data,
        selectedEmployee: ({} as EmployeeInf)
      })
      saveErrorFromServerFn(false);

    } catch (error) {
      console.log(error);
      saveErrorFromServerFn(true);

    }
  }

  async function updateEmployeeFn(employee : EmployeeInf){
    try {
      await customAxios.post("employee/update", {
        id: employee.id,
        email: employee.email,
        name: employee.name,
        last_name: employee.last_name,
        ci_rif: employee.ci_rif,
        phone_number: employee.phone_number,
        direction: employee.direction,
        birthday: employee.birthday,
        active: employee.active,
        secretary: employee.secretary,
        superuser: employee.superuser,
      });
      const resp = await customAxios.get("employee/all");
      dispatch({
        type: UPDATE_EMPLOYEE,
        employeeList: resp.data,
        selectedEmployee: employee
      })
    } catch (error) {
      console.log(error);
    }
  }

  async function updateEmployeePasswordFn(employeeId : number, password: string){
    try {
      await customAxios.post("employee/updatepassword", {
        id: employeeId,
        password: password,
      });
      const resp = await customAxios.get("employee/all");
      dispatch({
        type: UPDATE_EMPLOYEE_PASSWORD,
        employeeList: resp.data,
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <employeeContext.Provider
      value={{
        selectedEmployee: state.selectedEmployee,
        employeeList: state.employeeList,
        getEmployeesFn,
        setSelectedEmployeeFn,
        createEmployeeFn,
        deleteEmployeeFn,
        updateEmployeeFn,
        updateEmployeePasswordFn,
      }}
    >
      {children}
    </employeeContext.Provider>
  );
};

export default EmployeeSettingsProvider;
