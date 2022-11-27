import React, {useContext} from "react";
import { useRouter } from "next/router";
import { useReducer } from "react";
import employeeReducer from "./employeeReducer";
import customAxios from "../../config/axios";
import {employeeContext} from './employeeContext';
import {errorServerContext} from '../error/errorServerContext';
import {EmployeeInf} from "../../interface/EmployeeInf";
import {authContext} from '../login/authContext';

import {
    GET_EMPLOYEES,
    CREATE_EMPLOYEE,
    SET_SELECTED_EMPLOYEE,
    DELETE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    UPDATE_EMPLOYEE_PASSWORD,
    EMPLOYEES_ERROR,
    LOADING_FORM,
    UPDATE_MSJ_SUCCESS,
    UPDATE_MSJ_ERROR,
    LOADING_FORM_PASSWORD
  } from "./employeeType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const EmployeeSystemProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { user, logOut } = useContext(authContext);
  const router = useRouter();

  const initialState = {
    selectedEmployee : {} as EmployeeInf,
    employeeList : [],
    msjSuccess : "",
    msjError : "",
    loadingForm: false,
    loadingPasswordForm: false
    // loadingDataSentence: ''
  };

  const [state, dispatch] = useReducer(employeeReducer, initialState);

  async function getEmployeesFn() {
      try {
        const response = await customAxios.post("/employee/all",{
          id : user.id
        });
        dispatch({
          type: GET_EMPLOYEES,
          employeeList: response.data
        })
        saveErrorFromServerFn(false);
      } catch (error : any) {
        let message = error.response.data?.msg || error.message;
        console.log(error);
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
      dispatch({ type: LOADING_FORM, loadingForm: true })
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
      const response = await customAxios.post("/employee/all",{
        id : user.id
      });
        dispatch({
          type: CREATE_EMPLOYEE,
          employeeList: response.data,
          msjSuccess: "Usuario guardado exitosamente",
          msjError: "",
          loadingForm: false,
        })
        setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:""}), 8000);
        saveErrorFromServerFn(false);

    } catch (error : any ) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: LOADING_FORM, loadingForm: false });
      console.log(error );

        if(error.response?.status == "400"){
          dispatch({type:UPDATE_MSJ_ERROR, msjError:message})
          setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjError:""}), 8000);
          
        }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          dispatch({
            type: EMPLOYEES_ERROR,
            employeeList: [],
            selectedEmployee: {} as EmployeeInf
            })
          await logOut();

        }else {
          saveErrorFromServerFn(true);
        }
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
      dispatch({ type: LOADING_FORM, loadingForm: true })
      const resp = await customAxios.post("/employee/delete", {id: employeId});
      dispatch({
        type: DELETE_EMPLOYEE,
        employeeList: resp.data,
        selectedEmployee: ({} as EmployeeInf),
        loadingForm: false
      })
      saveErrorFromServerFn(false);

    } catch (error:any) {
      console.log(error);
        if(error.response?.status == "404"){//el usuario no está
          try {
            const resp = await customAxios.post("/employee/all",{id : user.id});
            dispatch({
              type: EMPLOYEES_ERROR,
              employeeList: resp.data,
              selectedEmployee: {} as EmployeeInf
              })
            dispatch({type: LOADING_FORM, loadingForm: false });

          } catch (error :any) {
            if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
              dispatch({
                type: EMPLOYEES_ERROR,
                employeeList: [],
                selectedEmployee: {} as EmployeeInf
                })
              dispatch({type: LOADING_FORM, loadingForm: false });
              await logOut();
    
            }else {
              dispatch({
                type: EMPLOYEES_ERROR,
                employeeList: [],
                selectedEmployee: {} as EmployeeInf
                })
              dispatch({type: LOADING_FORM, loadingForm: false });
              saveErrorFromServerFn(true);
            }
          }

        }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          dispatch({
            type: EMPLOYEES_ERROR,
            employeeList: [],
            selectedEmployee: {} as EmployeeInf
            })
          dispatch({type: LOADING_FORM, loadingForm: false });
          await logOut();

        }else {
          dispatch({
            type: EMPLOYEES_ERROR,
            employeeList: [],
            selectedEmployee: {} as EmployeeInf
            })
          dispatch({type: LOADING_FORM, loadingForm: false });
          saveErrorFromServerFn(true);
        }
    }
  }

  async function updateEmployeeFn(employee : EmployeeInf){
    try {
      dispatch({ type: LOADING_FORM, loadingForm: true })
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
      const resp = await customAxios.post("/employee/all",{
        id : user.id
      });
      dispatch({
        type: UPDATE_EMPLOYEE,
        employeeList: resp.data,
        selectedEmployee: employee,
        msjSuccess: "Empleado actualizado exitosamente",
        msjError: "",
        loadingForm: false,
      })
      setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:""}), 8000);
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      console.log(error);

      if(error.response?.status == "404"){//el usuario se intenta actualizar pero no está en la base de datos
        dispatch({type:UPDATE_MSJ_ERROR, msjError:message})
        setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjError:""}), 8000);

        try {
          const resp = await customAxios.post("/employee/all",{id : user.id});
          dispatch({
            type: EMPLOYEES_ERROR,
            employeeList: resp.data,
            selectedEmployee: {} as EmployeeInf
            })
          dispatch({type: LOADING_FORM, loadingForm: false });

        } catch (error :any) {
          if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
            dispatch({
              type: EMPLOYEES_ERROR,
              employeeList: [],
              selectedEmployee: {} as EmployeeInf
              })
            dispatch({type: LOADING_FORM, loadingForm: false });
            await logOut();
  
          }else {
            dispatch({
              type: EMPLOYEES_ERROR,
              employeeList: [],
              selectedEmployee: {} as EmployeeInf
              })
            dispatch({type: LOADING_FORM, loadingForm: false });
            saveErrorFromServerFn(true);
          }
        }

      }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        dispatch({
          type: EMPLOYEES_ERROR,
          employeeList: [],
          selectedEmployee: {} as EmployeeInf
          })
        dispatch({ type: LOADING_FORM, loadingForm: false })
        await logOut();
      }else {
        dispatch({
          type: EMPLOYEES_ERROR,
          employeeList: [],
          selectedEmployee: {} as EmployeeInf
          })
        dispatch({ type: LOADING_FORM, loadingForm: false })
        saveErrorFromServerFn(true);
      }
    }
  }

  async function updateEmployeePasswordFn(employeeId : number, password: string){
    try {
      dispatch({ type: LOADING_FORM_PASSWORD, loadingPasswordForm: true })
      await customAxios.post("employee/updatepassword", {
        id: employeeId,
        password: password,
      });
      const resp = await customAxios.post("/employee/all",{
        id : user.id
      });
      dispatch({
        type: UPDATE_EMPLOYEE_PASSWORD,
        employeeList: resp.data,
        msjSuccess: "Contraseña cambiada exitosamente",
        msjError: "",
        loadingPasswordForm: false,
      })
      setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:""}), 8000);
      saveErrorFromServerFn(false);
    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      console.log(error);

      if(error.response?.status == "404"){//el usuario se intenta actualizar pero no está en la base de datos
        dispatch({type:UPDATE_MSJ_ERROR, msjError:message})
        setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjError:""}), 8000);

        try {
          const resp = await customAxios.post("/employee/all",{id : user.id});
          dispatch({
            type: EMPLOYEES_ERROR,
            employeeList: resp.data,
            selectedEmployee: {} as EmployeeInf
            })
          dispatch({type: LOADING_FORM_PASSWORD, loadingPasswordForm: false });

        } catch (error :any) {
          if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
            dispatch({
              type: EMPLOYEES_ERROR,
              employeeList: [],
              selectedEmployee: {} as EmployeeInf
              })
            dispatch({type: LOADING_FORM_PASSWORD, loadingPasswordForm: false });
            await logOut();
  
          }else {
            dispatch({
              type: EMPLOYEES_ERROR,
              employeeList: [],
              selectedEmployee: {} as EmployeeInf
              })
            dispatch({type: LOADING_FORM_PASSWORD, loadingPasswordForm: false });
            saveErrorFromServerFn(true);
          }
        }

      }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        dispatch({
          type: EMPLOYEES_ERROR,
          employeeList: [],
          selectedEmployee: {} as EmployeeInf
          })
        dispatch({ type: LOADING_FORM_PASSWORD, loadingPasswordForm: false })
        await logOut();
      }else {
        dispatch({
          type: EMPLOYEES_ERROR,
          employeeList: [],
          selectedEmployee: {} as EmployeeInf
          })
        dispatch({ type: LOADING_FORM_PASSWORD, loadingPasswordForm: false })
        saveErrorFromServerFn(true);
      }
    }
    
  }

  return (
    <employeeContext.Provider
      value={{
        selectedEmployee: state.selectedEmployee,
        employeeList: state.employeeList,
        msjSuccess : state.msjSuccess,
        msjError : state.msjError,
        loadingForm: state.loadingForm,
        loadingPasswordForm: state.loadingPasswordForm,
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

export default EmployeeSystemProvider;
