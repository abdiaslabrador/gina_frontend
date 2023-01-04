import {
  UPDATE_DISCOUNT,
  UPDATE_ACCOUNT,
  CLEAN_DOCUMENT_ACCOUNT,
  } from "./docAccountType";
  
  type Action =
  
    | {
        type: "UPDATE_DISCOUNT";
        discount: number,
      }
    | {
        type: "UPDATE_ACCOUNT";
        subtotal: number,
        dolares: number,
        total:  number,
      }
    | {
        type: "CLEAN_DOCUMENT_ACCOUNT";
        subtotal?: number,
        dolares?: number,
        discount?: number,
        total?:  number,
      }
    ;
    
    
  const docAccountReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      
      case UPDATE_DISCOUNT:
      return {
        ...state,
        discount: action.discount,
      };
      case UPDATE_ACCOUNT:
        return {
          ...state,
          subtotal: action.subtotal,
          dolares: action.dolares,
          total:  action.total,
        };
        case CLEAN_DOCUMENT_ACCOUNT:
          return {
            ...state,
            subtotal: 0,
            dolares: 0,
            discount: 0,
            total:  0,
          };

      default:
        return state;
    }
  };
  
  export default docAccountReducer;
  