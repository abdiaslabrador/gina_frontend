import {
  GET_FPAYMENTS,
  SET_SELECTED_FORPAYMENT,
  LOADING_GET_FPAYMENTS,
  FPAYMENTS_ERROR,
} from "./foreignPaymentType";
  import { PaymentInf } from "../../../../interface/checkOut/paymentInf";
  
  type Action =
  
    | {
        type: "GET_FPAYMENTS";
        foreignPaymentList: PaymentInf[];
        loadingForeignPayments: boolean,
      }
    | {
        type: "SET_SELECTED_FORPAYMENT";
        selectedForeignPayment : any,
      }
    | {
        type: "LOADING_GET_FPAYMENTS";
        loadingForeignPayments: boolean;
      }
    | {
        type: "FPAYMENTS_ERROR";
        foreignPaymentList?: PaymentInf[];
        selectedForeignPayment?: PaymentInf;
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
    
    
  const foreignPaymentReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case GET_FPAYMENTS:
        return {
          ...state,
          foreignPaymentList: action.foreignPaymentList,
          loadingForeignPayments: action.loadingForeignPayments,
        };
          case SET_SELECTED_FORPAYMENT:
          return {
            ...state,
            selectedForeignPayment: action.selectedForeignPayment
          };
          case LOADING_GET_FPAYMENTS:
          return {
            ...state,
            loadingForeignPayments: action.loadingForeignPayments,
          };
          case FPAYMENTS_ERROR:
          return {
            ...state,
            foreignPaymentList:  [],
            selectedForeignPayment: null,
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
  
  export default foreignPaymentReducer;
  