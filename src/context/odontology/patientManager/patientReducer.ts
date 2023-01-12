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
  } from "./patientType";
  import { PatientInf } from "../../../interface/odontology/patientInf";
  
  type Action =
  
    | {
        type: "GET_PATIENT";
        patientList: PatientInf[];
        loadingPatientList : boolean,
      }
    | {
        type: "CREATE_PATIENT";
        msjSuccessPatient : string,
        msjErrorPatient : string,
        loadingFormPatient : boolean,
      }
    // | {
    //   type: "DELETE_PATIENT";
    //   patientList: PatientInf[];
    //   selectedPatient: PatientInf;
    //   loadingFormPatient: false;
    //   }
    | {
      type: "UPDATE_PATIENT";
      patientList: PatientInf[];
      selectedPatient: PatientInf;
      msjSuccessPatient : string,
      msjErrorPatient : string,
      loadingFormPatient : boolean,
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
      loadingFormPatient: boolean;
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
      msjSuccessPatient : string,
      
    }
    | {
      type: "UPDATE_MSJ_ERROR";
      msjErrorPatient : string,
    }
    ;
    
    
  const patientReducer = (state: any = {}, action: Action) => {
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
          msjSuccessPatient : action.msjSuccessPatient,
          msjErrorPatient : action.msjErrorPatient,
          loadingFormPatient : action.loadingFormPatient,
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
        // case DELETE_PATIENT:
        //   return {
        //     ...state,
        //     patientList: action.patientList,
        //     selectedPatient: action.selectedPatient,
        //     loadingFormPatient: false
        //   };
          case UPDATE_PATIENT:
          return {
            ...state,
            patientList: action.patientList,
            selectedPatient: action.selectedPatient,
            msjSuccessPatient: action.msjSuccessPatient,
            msjErrorPatient: action.msjErrorPatient,
            loadingFormPatient: action.loadingFormPatient,
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
            loadingFormPatient: action.loadingFormPatient,
          };
          case LOADING_GET_PATIENT:
          return {
            ...state,
            loadingPatientList: action.loadingPatientList,
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

      default:
        return state;
    }
  };
  
  export default patientReducer;
  