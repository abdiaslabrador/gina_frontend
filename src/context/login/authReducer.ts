import {
  GET_USER, 
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_ERROR_SERVER,
  LOG_OUT,
} from "./authTypes";
import EmployeeInf from "../../interface/EmployeeInf";

type Action =
  | {
      type: "GET_USER";
      user?: EmployeeInf;
      authenticated?: boolean;
      message?: string;
      
    }
  | {
      type: "LOGIN_SUCCESS";
      authenticated?: boolean;
      message?: string;
      
    }
  | {
      type: "LOGIN_ERROR";
      user?: EmployeeInf;
      authenticated?: boolean;
      message?: string;
    }
  | {
      type: "LOGIN_ERROR_SERVER";
      user?: EmployeeInf;
      authenticated?: boolean;
      message?: string;
      
    }
  | {
      type: "LOG_OUT";
      user?: EmployeeInf;
      authenticated?: boolean;
      message?: string;
      
    };

const authReducer = (state: any = {}, action: Action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
        authenticated: true,
        message: "",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        message: "",
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: null,
        authenticated: null,
        message: action.message,
      };
    case LOGIN_ERROR_SERVER:
      return {
        ...state,
        message: action.message,
      };
    case LOG_OUT:
      return {
        ...state,
        user: null,
        authenticated: null,
        message: action.message,
      };
    default:
      return state;
  }
};

export default authReducer;
