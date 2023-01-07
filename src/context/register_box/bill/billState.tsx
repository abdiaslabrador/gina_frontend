import React, {useContext, useReducer} from "react";
import customAxios from "../../../config/axios";
import {errorServerContext} from '../../error/errorServerContext';
import {authContext} from '../../login/authContext';
import {BillInf} from "../../../interface/billInf";
import billReducer from "./billReducer";
import {billContext} from './billContext';
import {
  GET_BILLS, 
  SET_SELECTED_SELECT,
  LOADING_GET_BILL,
  SET_SELECTED_BILL,
  BILL_CLEAN_STATE,
  BILLS_ERROR,
 } from "./billType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const BillProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { user, logOut } = useContext(authContext);

  const initialState = {
    selectedBill : {} as BillInf,
    billList : [],
    selectOption: "",
    searchFormValue: "",
    // msjSuccessBill : "",
    // msjErrorBill : "",
    loadingFormBill: false,
    loadingBillList: false,
  };

  const [state, dispatch] = useReducer(billReducer, initialState);

  function cleanBillFn(){//para cuando se cierra el modal se limpia el state
    dispatch({type: BILL_CLEAN_STATE})
  }
  
  function setSelectOptionFn(optionSelected : string){
    dispatch({type: SET_SELECTED_SELECT, selectOption: optionSelected})
  }

  function setSelectedBillFn(bill: BillInf) {
    dispatch({
      type: SET_SELECTED_BILL,
      selectedBill: bill
    })
  }

 async function searchBillByIdFn(id : string) { //nuevo metodo
    try {
      dispatch({ type: LOADING_GET_BILL, loadingBillList: true })
      const response = await customAxios.post("/document/bill/getbyid",{
        id: id,
      });
      dispatch({
        type: GET_BILLS,
        billList: response.data,
        loadingBillList: false,
      })
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({ type: LOADING_GET_BILL, loadingBillList: false })
      dispatch({type: BILLS_ERROR,})

      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      } else {
        saveErrorFromServerFn(true);
      }
    }
  }

  async function searchBillByDateFn(date_since : string, date_until : string) {
    try {
      dispatch({ type: LOADING_GET_BILL, loadingBillList: true })
      const response = await customAxios.post("/document/bill/getbydate",{
        date_since: date_since,
        date_until: date_until
      });
      dispatch({
        type: GET_BILLS,
        billList: response.data,
        loadingBillList: false,
      })
      saveErrorFromServerFn(false);
    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({ type: LOADING_GET_BILL, loadingBillList: false })
      dispatch({type: BILLS_ERROR,})

      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      } else {
        saveErrorFromServerFn(true);
      }
    }
  }

  return (
    <billContext.Provider
      value={{
        selectedBill: state.selectedBill,
        billList: state.billList,
        selectOption: state.selectOption,
        searchFormValue: state.searchFormValue,
        // msjSuccessBill : state.msjSuccessBill,
        // msjErrorBill : state.msjErrorBill,
        loadingFormBill: state.loadingFormBill,
        loadingBillList: state.loadingBillList,
        searchBillByIdFn,
        setSelectedBillFn,
        setSelectOptionFn,
        searchBillByDateFn,
        cleanBillFn,
      }}
    >
      {children}
    </billContext.Provider>
  );
};

export default BillProvider;
