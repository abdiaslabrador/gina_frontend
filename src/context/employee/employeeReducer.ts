import {
    GET_EMPLOYEES,
    SET_SELECTED_EMPLOYEE,
    DELETE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    UPDATE_EMPLOYEE_PASSWORD,
    EMPLOYEES_ERROR
  } from "./employeeType";
  import EmployeeInf from "../../interface/EmployeeInf";
  
  type Action =
    | {
        type: "GET_EMPLOYEES";
        employeeList: EmployeeInf[];
      }
    | {
      type: "DELETE_EMPLOYEE";
      employeeList: EmployeeInf[];
      selectedEmployee: EmployeeInf;
      }
    | {
      type: "UPDATE_EMPLOYEE";
      employeeList: EmployeeInf[];
      selectedEmployee: EmployeeInf;
      }
    | {
      type: "UPDATE_EMPLOYEE_PASSWORD";
      employeeList: EmployeeInf[];
      }
    | {
      type: "SET_SELECTED_EMPLOYEE";
      selectedEmployee: EmployeeInf;
      }
    | {
        type: "EMPLOYEES_ERROR";
        employeeList: EmployeeInf[];
        selectedEmployee: EmployeeInf;
      };
    // | {
    //     type: "LOGIN_ERROR";
    //     user?: EmployeeInf;
    //     authenticated?: boolean;
    //     message?: string;
    //   }
    // | {
    //     type: "LOGIN_ERROR_SERVER";
    //     user?: EmployeeInf;
    //     authenticated?: boolean;
    //     message?: string;
    //     errorServer?: boolean;
    //   }
    // | {
    //     type: "LOG_OUT";
    //     user?: EmployeeInf;
    //     authenticated?: boolean;
    //     message?: string;
    //     errorServer?: boolean;
    //   };
  
  const employeeReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case GET_EMPLOYEES:
        return {
          ...state,
          employeeList: action.employeeList
        };
        case SET_SELECTED_EMPLOYEE:
          return {
            ...state,
            selectedEmployee: action.selectedEmployee
          };
        case DELETE_EMPLOYEE:
          return {
            ...state,
            employeeList: action.employeeList,
            selectedEmployee: action.selectedEmployee
          };
          case UPDATE_EMPLOYEE:
          return {
            ...state,
            employeeList: action.employeeList,
            selectedEmployee: action.selectedEmployee
          };
          case UPDATE_EMPLOYEE_PASSWORD:
          return {
            ...state,
            employeeList: action.employeeList
          };
          case EMPLOYEES_ERROR:
          return {
            ...state,
            employeeList: action.employeeList,
            selectedEmployee: action.selectedEmployee
          };
      default:
        return state;
    }
  };
  
  export default employeeReducer;
  