import {
  GET_USER, 
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOG_OUT,
  LOADING_FORM,
  LOADING_FORM_PASSWORD,
  UPDATE_USER,
  UPDATE_MSJ_SUCCESS,
  UPDATE_USER_PASSWORD
} from "./authTypes";
import {EmployeeInf} from "../../interface/EmployeeInf";

type Action =
  | {
      type: "GET_USER";
      user?: EmployeeInf;
      authenticated?: boolean;
      message?: string;
    }
  | {
    type: "UPDATE_MSJ_SUCCESS";
    message: string;
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
      
    }
    | {
      type: "LOADING_FORM";
      loadingForm: boolean;
      }
    | {
      type: "LOADING_FORM_PASSWORD";
      loadingPasswordForm: boolean;
      }
    | {
      type: "UPDATE_USER_PASSWORD";
      message: string;
      loadingPasswordForm: boolean;
      }
    | {
      type:"UPDATE_USER";
      user: EmployeeInf;
      message?: string;
      loadingForm: boolean,
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
        user: {} as EmployeeInf,
        authenticated: null,
        message: action.message,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {} as EmployeeInf,
        authenticated: null,
        message: action.message,
      };
    case LOADING_FORM:
      return {
        ...state,
        loadingForm: action.loadingForm,
      };
    case UPDATE_USER:
    return {
      ...state,
      user: action.user,
      message: action.message,
      loadingForm: action.loadingForm,
    };
    case UPDATE_MSJ_SUCCESS:
    return {
      ...state,
      message: action.message,
    };
    case LOADING_FORM_PASSWORD:
    return {
      ...state,
      loadingPasswordForm: action.loadingPasswordForm,
    };
    case UPDATE_USER_PASSWORD:
    return {
      ...state,
      message: action.message,
      loadingPasswordForm: action.loadingPasswordForm,
    };
    default:
      return state;
  }
};

export default authReducer;
