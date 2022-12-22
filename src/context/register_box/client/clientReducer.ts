import {
    GET_CLIENT,
    CREATE_CLIENT,
    DELETE_CLIENT,
    SET_SELECTED_CLIENT,
    LOADING_FORM,
    UPDATE_CLIENT,
    UPDATE_MSJ_SUCCESS,
    UPDATE_MSJ_ERROR,
    CLIENTS_ERROR,
  } from "./clientType";
  import { ClientInf } from "../../../interface/clientInf";
  
  type Action =
  
    | {
        type: "GET_CLIENT";
        clientList: ClientInf[];
        loadingForm : boolean,
      }
    | {
        type: "CREATE_CLIENT";
        msjSuccess : string,
        msjError : string,
        loadingForm : boolean,
      }
    | {
      type: "DELETE_CLIENT";
      clientList: ClientInf[];
      selectedClient: ClientInf;
      loadingForm: false;
      }
    | {
      type: "UPDATE_CLIENT";
      clientList: ClientInf[];
      selectedClient: ClientInf;
      msjSuccess : string,
      msjError : string,
      loadingForm : boolean,
      }
    | {
      type: "SET_SELECTED_CLIENT";
      selectedClient: ClientInf;
      }
    | {
      type: "LOADING_FORM";
      loadingForm: boolean;
      }
    | {
        type: "CLIENTS_ERROR";
        clientList?: ClientInf[];
        selectedClient?: ClientInf;
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
      case GET_CLIENT:
        return {
          ...state,
          clientList: action.clientList,
          loadingForm: action.loadingForm
        };
        case CREATE_CLIENT:
        return {
          ...state,
          msjSuccess : action.msjSuccess,
          msjError : action.msjError,
          loadingForm : action.loadingForm,
        };
        case SET_SELECTED_CLIENT:
          return {
            ...state,
            selectedClient: action.selectedClient
          };
        case DELETE_CLIENT:
          return {
            ...state,
            clientList: action.clientList,
            selectedClient: action.selectedClient,
            loadingForm: false
          };
          case UPDATE_CLIENT:
          return {
            ...state,
            clientList: action.clientList,
            selectedClient: action.selectedClient,
            msjSuccess: action.msjSuccess,
            msjError: action.msjError,
            loadingForm: action.loadingForm,
          };
          case CLIENTS_ERROR:
          return {
            ...state,
            clientList: [],
            selectedClient: {} as ClientInf
          };
          case LOADING_FORM:
          return {
            ...state,
            loadingForm: action.loadingForm,
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
  