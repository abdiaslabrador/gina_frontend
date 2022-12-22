import {
  GET_CURRENCY,
  UPDATE_CURRENCY,
  LOADING_FORM,
  LOADING_CURRENCY,
  UPDATE_MSJ_SUCCESS,
  UPDATE_MSJ_ERROR,
  CURRENCY_ERROR,
} from "./currencyType";
  import { CurrencyInf } from "../../../interface/currencyInf";
  
  type Action =
  
    | {
        type: "GET_CURRENCY";
        currency: CurrencyInf | null;
        loadingCurrency: boolean,
      }
    | {
      type: "UPDATE_CURRENCY";
      currency: CurrencyInf | null;
      msjSuccess : string,
      msjError : string,
      loadingForm : boolean,
      }
    | {
      type: "LOADING_FORM";
      loadingForm: boolean;
      }
    | {
      type: "LOADING_CURRENCY";
      loadingCurrency: boolean;
      }
    | {
        type: "CURRENCY_ERROR";
        currency?: CurrencyInf | null;
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
    
    
  const currencyReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case GET_CURRENCY:
        return {
          ...state,
          currency: action.currency,
          loadingCurrency: action.loadingCurrency,
        };
          case UPDATE_CURRENCY:
          return {
            ...state,
            currency: action.currency,
            msjSuccess : action.msjSuccess,
            msjError : action.msjError,
            loadingForm : action.loadingForm,
          };
          case CURRENCY_ERROR:
          return {
            ...state,
            currency:  null,
          };
          case LOADING_FORM:
          return {
            ...state,
            loadingForm: action.loadingForm,
          };
          case LOADING_CURRENCY:
          return {
            ...state,
            loadingCurrency: action.loadingCurrency,
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
  
  export default currencyReducer;
  