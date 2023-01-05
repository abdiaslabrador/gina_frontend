import React, {useContext, useReducer} from "react";
import customAxios from "../../../config/axios";
import {errorServerContext} from '../../error/errorServerContext';
import {authContext} from '../../login/authContext';
// import {ProductInf} from "../../../interface/billInf";
import billReducer from "./billReducer";
import {billContext} from './billContext';
import {
//   GET_PRODUCTS, 
//   SET_SELECTED_PRODUCT,
  SET_SELECTED_SELECT,
//   SET_SELECTED_SEARCHFORM,
//   LOADING_FORM,
//   LOADING_PRODUCT,
//   UPDATE_MSJ_SUCCESS,
//   UPDATE_MSJ_ERROR,
//   UPDATE_PRODUCT,
//   PRODUCTS_CLEAN_STATE,
//   PRODUCTS_ERROR,
 } from "./billType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const BillProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { user, logOut } = useContext(authContext);

  const initialState = {
    // selectedBill : {} as ProductInf,
    // billList : [],
    selectOption: "",
    searchFormValue: "",
    // msjSuccessBill : "",
    // msjErrorBill : "",
    loadingFormBill: false,
    loadingBillList: false,
  };

  const [state, dispatch] = useReducer(billReducer, initialState);

  // function cleanProductFn(){//para cuando se cierra el modal se limpia el state
  //   dispatch({type: PRODUCTS_CLEAN_STATE})
  // }
  
  function setSelectOptionFn(optionSelected : string){
    dispatch({type: SET_SELECTED_SELECT, selectOption: optionSelected})
  }

  // function setSearchFormValueFn(searchValue : string | number){
  //   dispatch({type: SET_SELECTED_SEARCHFORM, searchFormValue: searchValue})
  // }

  // function setSelectedProductFn(product: ProductInf) {
  //   dispatch({
  //     type: SET_SELECTED_PRODUCT,
  //     selectedProduct: product
  //   })
  // }

  // async function searchProductByFn(searchValue : string | number) { //nuevo metodo
  //   setSearchFormValueFn(searchValue);
  //   try {
  //     dispatch({ type: LOADING_PRODUCT, loadingProduct: true })
  //     const response = await customAxios.post("/product/searchby",{
  //       selectValue: searchValue,
  //       selectOption : state.selectOption
  //     });
  //     dispatch({
  //       type: GET_PRODUCTS,
  //       productList: response.data,
  //       loadingProduct: false,
  //     })
  //     saveErrorFromServerFn(false);
  //   } catch (error : any) {
  //     let message = error.response.data?.msg || error.message;
  //     dispatch({ type: LOADING_PRODUCT, loadingProduct: false })
  //     dispatch({type: PRODUCTS_ERROR,})
  //     if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //       await logOut();
  //     } else {
  //       saveErrorFromServerFn(true);
  //     }
  //   }
  // }

  // async function updateProductFn(product : any){
  //   try {
  //     dispatch({ type: LOADING_FORM, loadingForm: true })
  //     await customAxios.post("product/update", {
  //       id: product.id,
  //       code: product.code,
  //       description: product.description.trim().toLowerCase(),
  //       cant: product.cant,
  //       price: product.price,
  //       price_ref: product.price_ref,
  //       enable_cant: product.enable_cant,
  //       admit_update_currency: product.admit_update_currency,
  //     });
  //     await searchProductByFn(state.searchFormValue);
  //     dispatch({
  //       type: UPDATE_PRODUCT,
  //       selectedProduct: product,
  //       msjSuccess: "Producto actualizado exitosamente",
  //       msjError: "",
  //       loadingForm: false,
  //     })
  //     setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:""}), 8000);
  //     saveErrorFromServerFn(false);

  //   } catch (error : any) {
  //     let message = error.response.data?.msg || error.message;
  //     console.log(error);

  //     if(error.response?.status == "404"){//lo que se intenta actualizar pero no está en la base de datos
  //       await searchProductByFn(state.searchFormValue);
  //       setSelectedProductFn({} as ProductInf); //esto es nuevo, al pedir toda la lista se reinica la selección
  //       dispatch({ type: LOADING_FORM, loadingForm: false })
  //       dispatch({type:UPDATE_MSJ_ERROR, msjError:message})
  //       setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjError:""}), 8000);

  //     }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //       dispatch({type: PRODUCTS_ERROR})
  //       dispatch({ type: LOADING_FORM, loadingForm: false })
  //       await logOut();

  //     }else {
  //       dispatch({type: PRODUCTS_ERROR})
  //       dispatch({ type: LOADING_FORM, loadingForm: false })
  //       saveErrorFromServerFn(true);
  //     }
  //   }
  // }

  return (
    <billContext.Provider
      value={{
        // selectedBill: state.selectedBill,
        // billList: state.billList,
        selectOption: state.selectOption,
        searchFormValue: state.searchFormValue,
        // msjSuccessBill : state.msjSuccessBill,
        // msjErrorBill : state.msjErrorBill,
        loadingFormBill: state.loadingFormBill,
        loadingBillList: state.loadingBillList,
        // cleanProductFn,
        // setSelectedProductFn,
        setSelectOptionFn,
        // searchProductByFn,
        // updateProductFn,
      }}
    >
      {children}
    </billContext.Provider>
  );
};

export default BillProvider;
