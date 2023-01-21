import {AppointmentInf} from "../../../../interface/odontology/appointmentInf";
import {
  SET_VISIBLE,
  SET_SELECTED_APPOIMENT,
  LOADING_FORM,
  SET_APPOINTMENTS,
  LOADING_GET_APPOINTMENTS,
  UPDATE_MSJ_SUCCESS,
  UPDATE_MSJ_ERROR,
  APPOINTMENT_ERROR
} from "./odontogramaType";
  
  type Action =

    | {
      type: "SET_SELECTED_APPOIMENT";
      appointment: AppointmentInf;
    }
    | {
        type: "SET_VISIBLE";
        visibleAppointmentEdit: boolean;
      }
    | {
        type: "SET_APPOINTMENTS";
        appointmentList: AppointmentInf[];
      }
    | {
      type: "LOADING_FORM";
      loadingFormAppointment: boolean;
    }
    | {
      type: "LOADING_GET_APPOINTMENTS";
      loadingAppointmentList: boolean;
    }
    | {
      type: "UPDATE_MSJ_SUCCESS";
      msjSuccessAppointment: string;
    }
    | {
      type: "UPDATE_MSJ_ERROR";
      msjErrorAppointment: string;
    }
    | {
      type: "APPOINTMENT_ERROR";
      appointment?: AppointmentInf | null;
    }
    
    ;
    
    
  const appointmentReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      
      case SET_SELECTED_APPOIMENT:
        return {
          ...state,
          appointment: action.appointment,
        };
      case SET_VISIBLE:
        return {
          ...state,
          visibleAppointmentEdit: action.visibleAppointmentEdit,
        };
      case SET_APPOINTMENTS:
        return {
          ...state,
          appointmentList: action.appointmentList,
          
        };
        case LOADING_FORM:
        return {
          ...state,
          loadingFormAppointment: action.loadingFormAppointment,
          
        };
        case LOADING_GET_APPOINTMENTS:
        return {
          ...state,
          loadingAppointmentList: action.loadingAppointmentList,
          
        };
        case UPDATE_MSJ_SUCCESS:
        return {
          ...state,
          msjSuccessAppointment: action.msjSuccessAppointment,
          
        };
        case UPDATE_MSJ_ERROR:
        return {
          ...state,
          msjErrorAppointment: action.msjErrorAppointment,
        };
        case APPOINTMENT_ERROR:
        return {
          ...state,
          appointment: null,
        };
        
      default:
        return state;
    }
  };
  
  export default appointmentReducer;
  