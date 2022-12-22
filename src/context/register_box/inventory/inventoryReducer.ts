import {
   GET_PRODUCTS, 
   SET_SELECTED_PRODUCT,
   SET_SELECTED_SELECT,
   SET_SELECTED_SEARCHFORM,
   LOADING_FORM,
   LOADING_PRODUCT,
   LOADING_PRODUCT_PRICES,
   UPDATE_MSJ_SUCCESS,
   UPDATE_MSJ_ERROR,
   UPDATE_PRODUCT,
   INVENTORY_CLEAN_STATE,
   PRODUCTS_ERROR,
  } from "./inventoryType";
  import {ProductInf} from "../../../interface/productInf";
  
  type Action =
  
    | {
        type: "GET_PRODUCTS";
        productList: ProductInf[];
        loadingProduct: boolean,
      }
    | {
      type: "UPDATE_PRODUCT";
      selectedProduct: ProductInf;
      msjSuccess : string,
      msjError : string,
      loadingForm : boolean,
      }
        | {
      type: "SET_SELECTED_PRODUCT";
      selectedProduct: ProductInf;
      }
    | {
      type: "SET_SELECTED_SELECT";
      selectOption: string;
      }      
    | {
      type: "LOADING_FORM";
      loadingForm: boolean;
      }
    | {
      type: "LOADING_PRODUCT";
      loadingProduct: boolean;
      }
    | {
      type: "LOADING_PRODUCT_PRICES";
      loadingProductPrices: boolean;
      }
    | {
      type: "SET_SELECTED_SEARCHFORM";
      searchFormValue: string | number;
      }
    | {
        type: "PRODUCTS_ERROR";
        productList?: ProductInf[];
        selectedProduct?: ProductInf;
      }
    | {
        type: "INVENTORY_CLEAN_STATE";
        selectedProduct? : ProductInf;
        productList? : ProductInf[];
        selectOption?: string;
        msjSuccess? : string;
        msjError? : string;
        loadingForm?: boolean;
        loadingProduct?: boolean;
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
    
    
  const inventoryReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      
      
      case GET_PRODUCTS:
        return {
          ...state,
          productList: action.productList,
          loadingProduct: action.loadingProduct,
        };
        case SET_SELECTED_PRODUCT:
          return {
            ...state,
            selectedProduct: action.selectedProduct
          };
          case SET_SELECTED_SELECT:
          return {
            ...state,
            selectOption: action.selectOption
          };
          case PRODUCTS_ERROR:
          return {
            ...state,
            productList: [],
            selectedProduct: {} as ProductInf
          };
          case LOADING_FORM:
          return {
            ...state,
            loadingForm: action.loadingForm,
          };
          case LOADING_PRODUCT:
          return {
            ...state,
            loadingProduct: action.loadingProduct,
          };
          case LOADING_PRODUCT_PRICES:
          return {
            ...state,
            loadingProductPrices: action.loadingProductPrices,
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
          case UPDATE_PRODUCT:
            return {
              ...state,
              selectedProduct: action.selectedProduct,
              msjSuccess : action.msjSuccess,
              msjError : action.msjError,
              loadingForm : action.loadingForm,
            };
          case INVENTORY_CLEAN_STATE:
            return {
              ...state,
              selectedProduct : {} as ProductInf,
              productList : [],
              searchFormValue: "",
              selectOption: "",
              msjSuccess : "",
              msjError : "",
              loadingForm: false,
              loadingProduct: false,
            };
          case SET_SELECTED_SEARCHFORM:
            return {
              ...state,
              searchFormValue: action.searchFormValue
            };

      default:
        return state;
    }
  };
  
  export default inventoryReducer;
  