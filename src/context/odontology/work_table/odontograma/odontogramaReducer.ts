import {ToothInf} from "../../../../interface/odontology/odontogramaInf";
import {
  SET_VISIBLE_TOOTH_OPTIONS,
  SET_SELECTED_TOOTH,
  LOADING_GET_THEE,
  THEE_ERROR,
  SET_ODTG_EDITABLE,
  LOADING_CREATE_UPDATE_TOOTH
} from "./odontogramaType";
  
  type Action =
    
    | {
      type: "SET_ODTG_EDITABLE";
      odontogramaEditable: any;
    }
    | {
      type: "SET_VISIBLE_TOOTH_OPTIONS";
      visibleToothOptions: boolean;
    }
    | {
        type: "SET_SELECTED_TOOTH";
        tooth: ToothInf;
      }
    // | {
    //     type: "SET_APPOINTMENTS";
    //     appointmentList: AppointmentInf[];
    //   }
    // | {
    //   type: "LOADING_FORM";
    //   loadingFormAppointment: boolean;
    // }
    | {
      type: "LOADING_GET_THEE";
      loadingTeethList: boolean;
    }
    | {
      type: "LOADING_CREATE_UPDATE_TOOTH";
      loadingCreateUpdateTeeth: boolean;
    }
    // | {
    //   type: "UPDATE_MSJ_SUCCESS";
    //   msjSuccessAppointment: string;
    // }
    // | {
    //   type: "UPDATE_MSJ_ERROR";
    //   msjErrorAppointment: string;
    // }
    | {
      type: "THEE_ERROR";
      tooth?: ToothInf[];
    }
    
    ;
    
    
  const appointmentReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      
      case SET_ODTG_EDITABLE:
        return {
          ...state,
          odontogramaEditable: action.odontogramaEditable,
        };
      case SET_VISIBLE_TOOTH_OPTIONS:
        return {
          ...state,
          visibleToothOptions: action.visibleToothOptions,
        };
      case SET_SELECTED_TOOTH:
        return {
          ...state,
          tooth: action.tooth,
        };
      // case SET_APPOINTMENTS:
      //   return {
      //     ...state,
      //     appointmentList: action.appointmentList,
          
      //   };
      //   case LOADING_FORM:
      //   return {
      //     ...state,
      //     loadingFormAppointment: action.loadingFormAppointment,
          
      //   };
        case LOADING_GET_THEE:
        return {
          ...state,
          loadingTeethList: action.loadingTeethList,
        };
        case LOADING_CREATE_UPDATE_TOOTH:
        return {
          ...state,
          loadingCreateUpdateTeeth: action.loadingCreateUpdateTeeth,
        };
        
      //   case UPDATE_MSJ_SUCCESS:
      //   return {
      //     ...state,
      //     msjSuccessAppointment: action.msjSuccessAppointment,
          
      //   };
      //   case UPDATE_MSJ_ERROR:
      //   return {
      //     ...state,
      //     msjErrorAppointment: action.msjErrorAppointment,
      //   };
        case THEE_ERROR:
        return {
          ...state,
          ToothInf: [],
        };
        
      default:
        return state;
    }
  };
  
  export default appointmentReducer;
  