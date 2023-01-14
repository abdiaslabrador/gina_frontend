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
        patient: PatientInf;
      }
    ;
    
    
  const patientReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case SET_PATIENT:
        return {
          ...state,
          patient: action.patient,
          
        };

      default:
        return state;
    }
  };
  
  export default patientReducer;
  