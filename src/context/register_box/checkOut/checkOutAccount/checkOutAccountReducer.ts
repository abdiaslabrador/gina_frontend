import { 
         UPDATE_CHECKOUT_ACCOUNT,
         CLEAN_CHECKOUT_ACCOUNT
       } from "./checkOutAccountType";
  
  type Action =
  
    | {
        type: "UPDATE_CHECKOUT_ACCOUNT";
        checkout_payed : number;
        checkout_dolares : number;
        checkout_balance : number;
        checkout_change : number;
      }
    | {
        type: "CLEAN_CHECKOUT_ACCOUNT";
        checkout_payed? : number;
        checkout_dolares? : number;
        checkout_balance? : number;
        checkout_change? : number;
      }
      
    ;
    
    
  const checkOutAccountReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case UPDATE_CHECKOUT_ACCOUNT:
        return {
          ...state,
          checkout_payed : action.checkout_payed,
          checkout_dolares : action.checkout_dolares,
          checkout_balance : action.checkout_balance,
          checkout_change : action.checkout_change,
        };
        case CLEAN_CHECKOUT_ACCOUNT:
          return {
            ...state,
            checkout_payed : 0,
            checkout_dolares : 0,
            checkout_balance : 0,
            checkout_change : 0,
          };
        
      default:
        return state;
    }
  };
  
  export default checkOutAccountReducer;
  