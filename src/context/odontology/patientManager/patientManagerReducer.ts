import { PatientInf } from "../../../interface/odontology/patientInf";
import {
    GET_PATIENT,
    CREATE_PATIENT,
    DELETE_PATIENT,
    SET_SELECTED_PATIENT,
    SET_SELECTED_SELECT,
    LOADING_FORM,
    LOADING_GET_PATIENT,
    UPDATE_PATIENT,
    UPDATE_MSJ_SUCCESS,
    UPDATE_MSJ_ERROR,
    PATIENT_ERROR,
  } from "./patientManagerType";
  
  type Action =
  
    | {
        type: "GET_PATIENT";
        patientList: PatientInf[];
        loadingPatientList : boolean,
      }
    | {
        type: "CREATE_PATIENT";
        msjSuccessPatientList : string,
        msjErrorPatientList : string,
        loadingFormPatientList : boolean,
      }
    | {
      type: "DELETE_PATIENT";
      patientList: PatientInf[];
      selectedPatient: PatientInf;
      loadingFormPatientList: false;
      }
    | {
      type: "UPDATE_PATIENT";
      patientList: PatientInf[];
      selectedPatient: PatientInf;
      msjSuccessPatientList : string,
      msjErrorPatientList : string,
      loadingFormPatientList : boolean,
      }
    | {
      type: "SET_SELECTED_PATIENT";
      selectedPatient: PatientInf;
      }
    | {
      type: "SET_SELECTED_SELECT";
      selectOption: string;
      } 
    | {
      type: "LOADING_FORM";
      loadingFormPatientList: boolean;
      }
    | {
      type: "LOADING_GET_PATIENT";
      loadingPatientList: boolean;
      }
    | {
        type: "PATIENT_ERROR";
        patientList?: PatientInf[];
        selectedPatient?: PatientInf;
      }
    | {
      type: "UPDATE_MSJ_SUCCESS";
      msjSuccessPatientList : string,
      
    }
    | {
      type: "UPDATE_MSJ_ERROR";
      msjErrorPatientList : string,
    }
    ;
    
    
  const patientManagerReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case GET_PATIENT:
        return {
          ...state,
          patientList: action.patientList,
          loadingPatientList: action.loadingPatientList
        };
        case CREATE_PATIENT:
        return {
          ...state,
          msjSuccessPatientList : action.msjSuccessPatientList,
          msjErrorPatientList : action.msjErrorPatientList,
          loadingFormPatientList : action.loadingFormPatientList,
        };
        case SET_SELECTED_PATIENT:
          return {
            ...state,
            selectedPatient: action.selectedPatient
          };
        case SET_SELECTED_SELECT:
          return {
            ...state,
            selectOption: action.selectOption
          };
        case DELETE_PATIENT:
          return {
            ...state,
            patientList: action.patientList,
            selectedPatient: action.selectedPatient,
            loadingFormPatientList: false
          };
          case UPDATE_PATIENT:
          return {
            ...state,
            patientList: action.patientList,
            selectedPatient: action.selectedPatient,
            msjSuccessPatientList: action.msjSuccessPatientList,
            msjErrorPatientList: action.msjErrorPatientList,
            loadingFormPatientList: action.loadingFormPatientList,
          };
          case PATIENT_ERROR:
          return {
            ...state,
            patientList: [],
            selectedPatient: {} as PatientInf
          };
          case LOADING_FORM:
          return {
            ...state,
            loadingFormPatientList: action.loadingFormPatientList,
          };
          case LOADING_GET_PATIENT:
          return {
            ...state,
            loadingPatientList: action.loadingPatientList,
          };
          case UPDATE_MSJ_SUCCESS:
            return {
              ...state,
              msjSuccessPatientList: action.msjSuccessPatientList,
            };
          case UPDATE_MSJ_ERROR:
            return {
              ...state,
              msjErrorPatientList: action.msjErrorPatientList,
            };

      default:
        return state;
    }
  };
  
  export default patientManagerReducer;
  