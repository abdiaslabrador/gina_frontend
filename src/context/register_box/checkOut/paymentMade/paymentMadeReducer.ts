import { PaymentMadeInf } from "../../../../interface/checkOut/paymentMadeInf";
import {
  ADD_PAYMENTMADE,
  SET_SELECTED_PAYMENTMADE,
  DELETE_PAYMENTMADE,
  CLEAN_PAYMENTMADE
} from "./paymentMadeType";
  
  type Action =
  
    | {
        type: "ADD_PAYMENTMADE";
        paymentMadeList: PaymentMadeInf[];
        
      }
    | {
        type: "SET_SELECTED_PAYMENTMADE";
        selectedPaymentMade : PaymentMadeInf | null,
      }
    | {
      type: "DELETE_PAYMENTMADE";
      paymentMadeList: PaymentMadeInf[];
      selectedPaymentMade: PaymentMadeInf | null;
    }
    | {
      type: "CLEAN_PAYMENTMADE";
      paymentMadeList?: PaymentMadeInf[];
      selectedPaymentMade?: PaymentMadeInf | null;
    }
    ;
    
    
  const paymentMadeReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case ADD_PAYMENTMADE:
        return {
          ...state,
          paymentMadeList: action.paymentMadeList,
        };
        case SET_SELECTED_PAYMENTMADE:
        return {
          ...state,
          selectedPaymentMade: action.selectedPaymentMade,
        };
        case DELETE_PAYMENTMADE:
        return {
          ...state,
          paymentMadeList: action.paymentMadeList,
          selectedPaymentMade: null
        };
        case CLEAN_PAYMENTMADE:
        return {
          ...state,
          paymentMadeList: [],
          selectedPaymentMade: null
        };
        
      default:
        return state;
    }
  };
  
  export default paymentMadeReducer;