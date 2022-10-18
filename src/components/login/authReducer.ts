import GET_USER, { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_ERROR_SERVER,
        LOG_OUT} from './authTypes' 
import UserInf from "../../interface/user";

type Action =
  | {
      type: "GET_USER";
      user?: UserInf;
      authenticated?: boolean;
      message?: string;
      errorServer?:boolean,

    }
  | {
      type: "LOGIN_SUCCESS";
      authenticated?: boolean;
      message?: string;
      errorServer?:boolean,

    }
  | {
      type: "LOGIN_ERROR";
      user?: UserInf;
      authenticated?: boolean;
      message?: string;
    }
  | {
    type: "LOGIN_ERROR_SERVER";
    user?: UserInf;
    authenticated?: boolean;
    message?: string;
    errorServer?:boolean,
  }
  | {
      type: "LOG_OUT";
      user?: UserInf;
      authenticated?: boolean;
      message?: string;
      errorServer?:boolean,
    };

const authReducer = (state: any = {}, action: Action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
        errorServer:false,
        authenticated: true,
        message: "",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        errorServer:false,
        authenticated: true,
        message: "",
      };
      case LOGIN_ERROR:
      return {
        ...state,
        user: null,
        authenticated: null,
        errorServer:true,
        message: action.message,
      };
    case LOGIN_ERROR_SERVER:
      return {
        ...state,
        errorServer:true,
        message: action.message,
      };
    case LOG_OUT:
      return {
        ...state,
        user: null,
        errorServer:false,
        authenticated: null,
        message: action.message,
      };
    default:
      return state;
  }
};

export default authReducer;
