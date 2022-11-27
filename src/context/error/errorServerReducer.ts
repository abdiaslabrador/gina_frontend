import {
    UPDATE_ERROR,
  } from "./errorServerType";
  import {EmployeeInf} from "../../interface/EmployeeInf";
  
  type Action =
    | {
        type: "UPDATE_ERROR";
        errorFromServer : boolean;
      };
  
  const employeeReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case UPDATE_ERROR:
        return {
          ...state,
          errorFromServer: action.errorFromServer
        };
        
      default:
        return state;
    }
  };
  
  export default employeeReducer;
  