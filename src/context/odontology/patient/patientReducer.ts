import { PatientInf } from "../../../interface/odontology/patientInf";
import {
  SET_PATIENT,
  LOADING_FORM,
  LOADING_GET_PATIENT,
  UPDATE_MSJ_SUCCESS,
  UPDATE_MSJ_ERROR,
  PATIENT_ERROR
} from "./patientType";
  
  type Action =
  
    | {
        type: "SET_PATIENT";
        patient: PatientInf | null;
      }
    | {
      type: "LOADING_FORM";
      loadingFormPatient: boolean;
    }
    | {
      type: "UPDATE_MSJ_SUCCESS";
      msjSuccessPatient: string;
    }
    | {
      type: "UPDATE_MSJ_ERROR";
      msjErrorPatient: string;
    }
    | {
      type: "PATIENT_ERROR";
      patient?: PatientInf | null;
    }
    
    ;
    
    
  const patientReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case SET_PATIENT:
        return {
          ...state,
          patient: action.patient,
          
        };
        case LOADING_FORM:
        return {
          ...state,
          loadingFormPatient: action.loadingFormPatient,
          
        };
        case UPDATE_MSJ_SUCCESS:
        return {
          ...state,
          msjSuccessPatient: action.msjSuccessPatient,
          
        };
        case UPDATE_MSJ_ERROR:
        return {
          ...state,
          msjErrorPatient: action.msjErrorPatient,
        };
        case PATIENT_ERROR:
        return {
          ...state,
          patient: null,
        };
        
      default:
        return state;
    }
  };
  
  export default patientReducer;
  