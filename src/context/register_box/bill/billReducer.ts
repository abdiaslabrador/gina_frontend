import {
   GET_BILLS,
   SET_SELECTED_SELECT,
   SET_SELECTED_BILL,
   LOADING_GET_BILL,
   LOADING_CANCEL_BILL,
   CANCEL_BILL,
   BILL_CLEAN_STATE,
   BILLS_ERROR,
   UPDATE_MSJ_SUCCESS,
   UPDATE_MSJ_ERROR,
  } from "./billType";
  import { BillInf } from "../../../interface/billInf";
  
  type Action =
    
    | {
      type: "CANCEL_BILL";
      billList: BillInf[];
      loadingBillCancel: boolean,
      msjSuccessBill: string,
      selectedBill : BillInf,
    }
    | {
        type: "GET_BILLS";
        billList: BillInf[];
        loadingBillList: boolean,
      }    
    | {
      type: "SET_SELECTED_BILL";
      selectedBill: BillInf;
      }
    | {
      type: "SET_SELECTED_SELECT";
      selectOption: string;
      }
    | {
      type: "LOADING_GET_BILL";
      loadingBillList: boolean;
      }
    | {
      type: "LOADING_CANCEL_BILL";
      loadingBillCancel: boolean,
      }
    | {
        type: "BILLS_ERROR";
        billList?: BillInf[];
        selectedBill?: BillInf;
      }
    | {
        type: "BILL_CLEAN_STATE";
        selectedBill? : BillInf,
        billList? : BillInf[],
        selectOption?: string,
        msjSuccessBill? : string,
        msjErrorBill? : string,
        loadingFormBill?: boolean,
        loadingBillList?: boolean,
      }
      | {
        type: "UPDATE_MSJ_SUCCESS";
        msjSuccessBill : string,
        
      }
      | {
        type: "UPDATE_MSJ_ERROR";
        msjErrorBill : string,
      }
    ;
    
    
  const billReducer = (state: any = {}, action: Action) => {
    switch (action.type) {
      
      case CANCEL_BILL:
        return {
          ...state,
          billList: action.billList,
          loadingBillCancel: action.loadingBillCancel,
          msjSuccessBill: action.msjSuccessBill,
          selectedBill: action.selectedBill
        };
      case GET_BILLS:
        return {
          ...state,
          billList: action.billList,
          loadingBillList: action.loadingBillList,
        };
        case SET_SELECTED_BILL:
          return {
            ...state,
            selectedBill: action.selectedBill
          };
          case SET_SELECTED_SELECT:
          return {
            ...state,
            selectOption: action.selectOption
          };
          case BILLS_ERROR:
          return {
            ...state,
            billList: [],
            selectedBill: {} as BillInf
          };
          case LOADING_GET_BILL:
          return {
            ...state,
            loadingBillList: action.loadingBillList,
          };
          case LOADING_CANCEL_BILL:
          return {
            ...state,
            loadingBillCancel: action.loadingBillCancel,
          };
          case UPDATE_MSJ_SUCCESS:
            return {
              ...state,
              msjSuccessBill: action.msjSuccessBill,
            };
          case UPDATE_MSJ_ERROR:
            return {
              ...state,
              msjErrorBill: action.msjErrorBill,
            };
          case BILL_CLEAN_STATE:
            return {
              ...state,
              selectedBill : {} as BillInf,
              billList : [],
              selectOption: "",
              msjSuccessBill : "",
              msjErrorBill : "",
              loadingFormBill: false,
              loadingBillList: false,
            };
          

      default:
        return state;
    }
  };
  
  export default billReducer;
  