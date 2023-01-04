import { 
         LOADING_FINSIH_PURCHASE
       } from "./finishPurchaseType";
  
  type Action =
  
    | {
        type: "LOADING_FINSIH_PURCHASE";
        loadingDocumentInfo : boolean;
      }
      
    ;
    
    
  const finishPurchaseReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case LOADING_FINSIH_PURCHASE:
        return {
          ...state,
          loadingDocumentInfo : action.loadingDocumentInfo,
        };
        
        
      default:
        return state;
    }
  };
  
  export default finishPurchaseReducer;
  