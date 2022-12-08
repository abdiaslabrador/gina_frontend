import {
   GET_PRODUCTS, 
   CREATE_PRODUCT,
   DELETE_PRODUCT,
   UPDATE_PRODUCT,
   SET_SELECTED_PRODUCT,
   LOADING_FORM,
   LOADING_PRODUCT,
   UPDATE_MSJ_SUCCESS,
   UPDATE_MSJ_ERROR,
   PRODUCTS_ERROR
  } from "./productType";
  import {ProductInf} from "../../../interface/productInf";
  
  type Action =
  
    | {
        type: "GET_PRODUCTS";
        productList: ProductInf[];
        loadingProduct: boolean,
      }
    // | {
    //     type: "CREATE_EMPLOYEE";
    //     productList: ProductInf[];
    //     msjSuccess : string,
    //     msjError : string,
    //     loadingForm : boolean,
    //   }
    // | {
    //   type: "DELETE_EMPLOYEE";
    //   productList: ProductInf[];
    //   selectedProduct: ProductInf;
    //   loadingForm: false;
    //   }
    // | {
    //   type: "UPDATE_EMPLOYEE";
    //   productList: ProductInf[];
    //   selectedProduct: ProductInf;
    //   msjSuccess : string,
    //   msjError : string,
    //   loadingForm : boolean,
    //   }
    // | {
    //   type: "UPDATE_EMPLOYEE_PASSWORD";
    //   productList: ProductInf[],
    //   msjSuccess: string,
    //   msjError: string,
    //   loadingPasswordForm: boolean,
    //   }
    // | {
    //   type: "SET_SELECTED_EMPLOYEE";
    //   selectedProduct: ProductInf;
    //   }
    // | {
    //   type: "LOADING_FORM";
    //   loadingForm: boolean;
    //   }
    | {
      type: "LOADING_PRODUCT";
      loadingProduct: boolean;
      }
    // | {
    //   type: "LOADING_FORM_PASSWORD";
    //   loadingPasswordForm: boolean;
    //   }
    | {
        type: "PRODUCTS_ERROR";
        productList: ProductInf[];
        selectedProduct: ProductInf;
      }
    // | {
    //   type: "UPDATE_MSJ_SUCCESS";
    //   msjSuccess : string,
      
    // }
    // | {
    //   type: "UPDATE_MSJ_ERROR";
    //   msjError : string,
    // }
    ;
    
    
  const productReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state,
          productList: action.productList,
          loadingProduct: action.loadingProduct,
        };
        // case CREATE_EMPLOYEE:
        // return {
        //   ...state,
        //   productList: action.productList,
        //   msjSuccess : action.msjSuccess,
        //   msjError : action.msjError,
        //     loadingForm: action.loadingForm,

        // };
        // case SET_SELECTED_EMPLOYEE:
        //   return {
        //     ...state,
        //     selectedProduct: action.selectedProduct
        //   };
        // case DELETE_EMPLOYEE:
        //   return {
        //     ...state,
        //     productList: action.productList,
        //     selectedProduct: action.selectedProduct,
        //     loadingForm: false
        //   };
        //   case UPDATE_EMPLOYEE:
        //   return {
        //     ...state,
        //     productList: action.productList,
        //     selectedProduct: action.selectedProduct,
        //     msjSuccess: action.msjSuccess,
        //     msjError: action.msjError,
        //     loadingForm: action.loadingForm,
        //   };
        //   case UPDATE_EMPLOYEE_PASSWORD:
        //   return {
        //     ...state,
        //     type: UPDATE_EMPLOYEE_PASSWORD,
        //     productList: action.productList,
        //     msjSuccess: action.msjSuccess,
        //     msjError: action.msjError,
        //     loadingPasswordForm: action.loadingPasswordForm,
        //   };
          case PRODUCTS_ERROR:
          return {
            ...state,
            productList: action.productList,
            selectedProduct: action.selectedProduct
          };
        //   case LOADING_FORM:
        //   return {
        //     ...state,
        //     loadingForm: action.loadingForm,
        //   };
          case LOADING_PRODUCT:
          return {
            ...state,
            loadingProduct: action.loadingProduct,
          };
          
        //   case UPDATE_MSJ_SUCCESS:
        //     return {
        //       ...state,
        //       msjSuccess: action.msjSuccess,
        //     };
        //   case UPDATE_MSJ_ERROR:
        //     return {
        //       ...state,
        //       msjError: action.msjError,
        //     };

      default:
        return state;
    }
  };
  
  export default productReducer;
  