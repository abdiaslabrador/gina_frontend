import {
   GET_CLIENT, 
   LOADING_CLIENT,
   CANCEL_PURCHASE,
   ADD_TO_LIST,
   SET_SELECTED_PRODUCT,
   TAKEOUT,
   LOADING_PRODUCT_REGISTERBOX,
   GET_PRODUCT_REGISTERBOX,
   UPDATE_ACCOUNT,
  } from "./registerBoxType";
  import { ClientInf } from "../../../interface/clientInf";
import {ProductRegisterBoxInf} from "../../../interface/registerBoxInf";
  
  type Action =
  
    | {
        type: "UPDATE_ACCOUNT";
        subtotal: number,
        dolares: number,
        total:  number,
      }
    | {
        type: "GET_PRODUCT_REGISTERBOX";
        productApiRegisterBox: ProductRegisterBoxInf,
        loadingProductRegisterBox: boolean,
      }
    | {
        type: "LOADING_PRODUCT_REGISTERBOX";
        loadingProductRegisterBox: boolean,
      }
    | {
        type: "TAKEOUT";
        productListRegisterBox : ProductRegisterBoxInf[],
        selectedProductRegisterBox?: ProductRegisterBoxInf,
      }
    | {
        type: "ADD_TO_LIST";
        productListRegisterBox : ProductRegisterBoxInf[],
      }
    | {
        type: "CANCEL_PURCHASE";
        productListRegisterBox?: ProductRegisterBoxInf[],
        selectedProductRegisterBox? :  ProductRegisterBoxInf,
        client?: ClientInf | null;
        subtotal?: number,
        dolares?: number,
        total?:  number,
      }
    | {
        type: "GET_CLIENT";
        client: ClientInf | null;
        loadingClient: boolean,
      }
    | {
      type: "SET_SELECTED_PRODUCT";
      selectedProductRegisterBox: ProductRegisterBoxInf;
      }
    | {
      type: "LOADING_CLIENT";
      loadingClient: boolean;
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
    
    
  const registerBoxReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      
      case UPDATE_ACCOUNT:
          return {
            ...state,
            subtotal: action.subtotal,
            dolares: action.dolares,
            total:  action.total,
          };
      case GET_PRODUCT_REGISTERBOX:
          return {
            ...state,
            productApiRegisterBox: action.productApiRegisterBox,
            loadingProductRegisterBox: action.loadingProductRegisterBox,

          };
      case LOADING_PRODUCT_REGISTERBOX:
          return {
            ...state,
            loadingProductRegisterBox: action.loadingProductRegisterBox,
          };
      case TAKEOUT:
          return {
            ...state,
            productListRegisterBox : action.productListRegisterBox,
            selectedProductRegisterBox : {} as ProductRegisterBoxInf,
          };
      case ADD_TO_LIST:
          return {
            ...state,
            productListRegisterBox : action.productListRegisterBox,
          };
      case CANCEL_PURCHASE:
        return {
          ...state,
          client: null,
          productListRegisterBox: [],
          selectedProductRegisterBox : {} as ProductRegisterBoxInf,
          subtotal: 0,
          dolares: 0,
          total:  0,
        };
      case GET_CLIENT:
        return {
          ...state,
          client: action.client,
          loadingClient: action.loadingClient,
        };
      case SET_SELECTED_PRODUCT:
        return {
          ...state,
          selectedProductRegisterBox: action.selectedProductRegisterBox
        };
          case LOADING_CLIENT:
          return {
            ...state,
            loadingClient: action.loadingClient,
          };

      default:
        return state;
    }
  };
  
  export default registerBoxReducer;
  