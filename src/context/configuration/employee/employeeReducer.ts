import {
    GET_EMPLOYEES,
    CREATE_EMPLOYEE,
    SET_SELECTED_EMPLOYEE,
    DELETE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    UPDATE_EMPLOYEE_PASSWORD,
    EMPLOYEES_ERROR,
    LOADING_FORM,
    LOADING_EMPLOYEE,
    UPDATE_MSJ_SUCCESS,
    UPDATE_MSJ_ERROR,
    LOADING_FORM_PASSWORD
  } from "./employeeType";
  import {EmployeeInf} from "../../../interface/EmployeeInf";
  
  type Action =
  
    | {
        type: "GET_EMPLOYEES";
        employeeList: EmployeeInf[];
        loadingEmployee: boolean,
      }
    | {
        type: "CREATE_EMPLOYEE";
        employeeList: EmployeeInf[];
        msjSuccess : string,
        msjError : string,
        loadingForm : boolean,
      }
    | {
      type: "DELETE_EMPLOYEE";
      employeeList: EmployeeInf[];
      selectedEmployee: EmployeeInf;
      loadingForm: false;
      }
    | {
      type: "UPDATE_EMPLOYEE";
      employeeList: EmployeeInf[];
      selectedEmployee: EmployeeInf;
      msjSuccess : string,
      msjError : string,
      loadingForm : boolean,
      }
    | {
      type: "UPDATE_EMPLOYEE_PASSWORD";
      employeeList: EmployeeInf[],
      msjSuccess: string,
      msjError: string,
      loadingPasswordForm: boolean,
      }
    | {
      type: "SET_SELECTED_EMPLOYEE";
      selectedEmployee: EmployeeInf;
      }
    | {
      type: "LOADING_FORM";
      loadingForm: boolean;
      }
    | {
      type: "LOADING_EMPLOYEE";
      loadingEmployee: boolean;
      }
    | {
      type: "LOADING_FORM_PASSWORD";
      loadingPasswordForm: boolean;
      }
    | {
        type: "EMPLOYEES_ERROR";
        employeeList: EmployeeInf[];
        selectedEmployee: EmployeeInf;
      }
    | {
      type: "UPDATE_MSJ_SUCCESS";
      msjSuccess : string,
      
    }
    | {
      type: "UPDATE_MSJ_ERROR";
      msjError : string,
    }
    ;
    
    
  const employeeReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case GET_EMPLOYEES:
        return {
          ...state,
          employeeList: action.employeeList,
          loadingEmployee: action.loadingEmployee,
        };
        case CREATE_EMPLOYEE:
        return {
          ...state,
          employeeList: action.employeeList,
          msjSuccess : action.msjSuccess,
          msjError : action.msjError,
            loadingForm: action.loadingForm,

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
            selectedEmployee: action.selectedEmployee,
            loadingForm: false
          };
          case UPDATE_EMPLOYEE:
          return {
            ...state,
            employeeList: action.employeeList,
            selectedEmployee: action.selectedEmployee,
            msjSuccess: action.msjSuccess,
            msjError: action.msjError,
            loadingForm: action.loadingForm,
          };
          case UPDATE_EMPLOYEE_PASSWORD:
          return {
            ...state,
            type: UPDATE_EMPLOYEE_PASSWORD,
            employeeList: action.employeeList,
            msjSuccess: action.msjSuccess,
            msjError: action.msjError,
            loadingPasswordForm: action.loadingPasswordForm,
          };
          case EMPLOYEES_ERROR:
          return {
            ...state,
            employeeList: action.employeeList,
            selectedEmployee: action.selectedEmployee
          };
          case LOADING_FORM:
          return {
            ...state,
            loadingForm: action.loadingForm,
          };
          case LOADING_EMPLOYEE:
          return {
            ...state,
            loadingEmployee: action.loadingEmployee,
          };
          
          case LOADING_FORM_PASSWORD:
          return {
            ...state,
            loadingPasswordForm: action.loadingPasswordForm,
          };
          case UPDATE_MSJ_SUCCESS:
            return {
              ...state,
              msjSuccess: action.msjSuccess,
            };
          case UPDATE_MSJ_ERROR:
            return {
              ...state,
              msjError: action.msjError,
            };

      default:
        return state;
    }
  };
  
  export default employeeReducer;
  