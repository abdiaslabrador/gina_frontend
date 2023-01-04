import {
  GET_NPAYMENTS,
  LOADING_GET_NPAYMENTS,
  SET_SELECTED_NATPAYMENT,
  NPAYMENTS_ERROR,
} from "./natPaymentType";
  import { PaymentInf } from "../../../../interface/checkOut/paymentInf";
  
  type Action =
  
    | {
        type: "GET_NPAYMENTS";
        nationalPaymentList: PaymentInf[];
        loadingNatPayments: boolean,
      }
    | {
        type: "SET_SELECTED_NATPAYMENT";
        selectedNatPayment : any,
      }
    | {
      type: "LOADING_GET_NPAYMENTS";
      loadingNatPayments: boolean;
      }
    | {
        type: "NPAYMENTS_ERROR";
        nationalPaymentList?: PaymentInf[];
      }
    // | {
    //   type: "UPDATE_MSJ_SUCCESS";
    //   msjSuccessNPayment : string,
    // }
    // | {
    //   type: "UPDATE_MSJ_ERROR";
    //   msjErrorNPayment : string,
    // }
    ;
    
    
  const natPaymentReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case GET_NPAYMENTS:
        return {
          ...state,
          nationalPaymentList: action.nationalPaymentList,
          loadingNatPayments: action.loadingNatPayments,
        };
          case SET_SELECTED_NATPAYMENT:
          return {
            ...state,
            selectedNatPayment: action.selectedNatPayment
          };
          case NPAYMENTS_ERROR:
          return {
            ...state,
            nationalPaymentList:  [],
          };
          case LOADING_GET_NPAYMENTS:
          return {
            ...state,
            loadingNatPayments: action.loadingNatPayments,
          };
          // case UPDATE_MSJ_SUCCESS:
          //   return {
          //     ...state,
          //     msjSuccessNPayment: action.msjSuccess,
          //   };
          // case UPDATE_MSJ_ERROR:
          //   return {
          //     ...state,
          //     msjErrorNPayment: action.msjError,
          //   };

      default:
        return state;
    }
  };
  
  export default natPaymentReducer;
  