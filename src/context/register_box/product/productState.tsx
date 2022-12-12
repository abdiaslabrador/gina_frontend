import React, {useContext} from "react";
import { useRouter } from "next/router";
import { useReducer } from "react";
import customAxios from "../../../config/axios";
import {errorServerContext} from '../../error/errorServerContext';
import {authContext} from '../../login/authContext';
import {ProductInf} from "../../../interface/productInf";
import productReducer from "./productReducer";
import {productContext} from './productContext';
import {
  GET_PRODUCTS, 
  UPDATE_PRODUCT,
  SET_SELECTED_PRODUCT,
  SET_SELECTED_SELECT,
  LOADING_FORM,
  LOADING_PRODUCT,
  UPDATE_MSJ_SUCCESS,
  UPDATE_MSJ_ERROR,
  PRODUCTS_ERROR,
  PRODUCTS_CLEAN_STATE,
  SET_SELECTED_SEARCHFORM,
  LOADING_PRODUCT_PRICES
 } from "./productType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const ProductProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { user, logOut } = useContext(authContext);
  const router = useRouter();

  const initialState = {
    selectedProduct : {} as ProductInf,
    productList : [],
    selectOption: "",
    searchFormValue: "",
    msjSuccess : "",
    msjError : "",
    loadingForm: false,
    loadingProduct: false,
    loadingProductPrices: false,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  function cleanProductsFn(){//para cuando se cierra el modal se limpia el state
    dispatch({type: PRODUCTS_CLEAN_STATE})
  }
  
  function setSelectOptionFn(optionSelected : string){
    dispatch({type: SET_SELECTED_SELECT, selectOption: optionSelected})
  }
  
  function setSearchFormValueFn(searchValue : string | number){
    dispatch({type: SET_SELECTED_SEARCHFORM, searchFormValue: searchValue})
  }
  function setSelectedProductFn(product: ProductInf) {
    dispatch({
      type: SET_SELECTED_PRODUCT,
      selectedProduct: product
    })
  }

    async function searchProductByFn(searchValue : string | number) { //nuevo metodo
      setSearchFormValueFn(searchValue);
      try {
        dispatch({ type: LOADING_PRODUCT, loadingProduct: true })
        const response = await customAxios.post("/product/searchby",{
          selectValue: searchValue,
          selectOption : state.selectOption
        });
        dispatch({
          type: GET_PRODUCTS,
          productList: response.data,
          loadingProduct: false,
        })
        saveErrorFromServerFn(false);
      } catch (error : any) {
        let message = error.response.data?.msg || error.message;
        dispatch({ type: LOADING_PRODUCT, loadingProduct: false })
        dispatch({type: PRODUCTS_ERROR,})
        if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          await logOut();
        } else {
          saveErrorFromServerFn(true);
        }
      }
  }

  async function createProductFn(product: any){
    try {
      dispatch({ type: LOADING_FORM, loadingForm: true })
      await customAxios.post("product/create", {
        description: product.description.trim().toLowerCase(),
        cant: product.cant,
        price: product.price,
        price_ref: product.price_ref,
        admit_update_currency: product.admit_update_currency,
        enable_cant: product.enable_cant
      });
      dispatch({ type: LOADING_FORM, loadingForm: false })
      dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:"Producto creado exitosamente"});
      setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:""}), 8000);
      saveErrorFromServerFn(false);

    } catch (error : any ) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: LOADING_FORM, loadingForm: false });
      dispatch({type: PRODUCTS_ERROR,})
      console.log(error );

      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          await logOut();

        }else {
          saveErrorFromServerFn(true);
        }
    }
  }

  async function deleteProductFn(employeId : number){
    try {
      dispatch({ type: LOADING_FORM, loadingForm: true })
      const resp = await customAxios.post("/product/delete", {id: employeId});
      await searchProductByFn(state.searchFormValue);
      setSelectedProductFn({} as ProductInf); //esto es nuevo, al pedir toda la lista se reinica la selección
      dispatch({ type: LOADING_FORM, loadingForm: false })
      saveErrorFromServerFn(false);

    } catch (error:any) {
      console.log(error);
      
        if (error.response?.status == "404") { 
          await searchProductByFn(state.searchFormValue);
          setSelectedProductFn({} as ProductInf); //esto es nuevo, al pedir toda la lista se reinica la selección
          dispatch({ type: LOADING_FORM, loadingForm: false })

        }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          dispatch({type: LOADING_FORM, loadingForm: false });
          dispatch({type: PRODUCTS_ERROR})
          await logOut();

        }else {
          dispatch({ type: LOADING_FORM, loadingForm: false })
          dispatch({type: PRODUCTS_ERROR})
          saveErrorFromServerFn(true);
        }
    }
  }

  async function updateProductFn(product : any){
    try {
      dispatch({ type: LOADING_FORM, loadingForm: true })
      await customAxios.post("product/update", {
        id: product.id,
        code: product.code,
        description: product.description.trim().toLowerCase(),
        cant: product.cant,
        price: product.price,
        price_ref: product.price_ref,
        enable_cant: product.enable_cant,
        admit_update_currency: product.admit_update_currency,
      });
      await searchProductByFn(state.searchFormValue);
      dispatch({
        type: UPDATE_PRODUCT,
        selectedProduct: product,
        msjSuccess: "Producto actualizado exitosamente",
        msjError: "",
        loadingForm: false,
      })
      setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:""}), 8000);
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      console.log(error);

      if(error.response?.status == "404"){//lo que se intenta actualizar pero no está en la base de datos
        await searchProductByFn(state.searchFormValue);
        setSelectedProductFn({} as ProductInf); //esto es nuevo, al pedir toda la lista se reinica la selección
        dispatch({ type: LOADING_FORM, loadingForm: false })
        dispatch({type:UPDATE_MSJ_ERROR, msjError:message})
        setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjError:""}), 8000);

      }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        dispatch({type: PRODUCTS_ERROR})
        dispatch({ type: LOADING_FORM, loadingForm: false })
        await logOut();

      }else {
        dispatch({type: PRODUCTS_ERROR})
        dispatch({ type: LOADING_FORM, loadingForm: false })
        saveErrorFromServerFn(true);
      }
    }
  }

  async function updateProductPricesFn(){
    try {
      dispatch({ type: LOADING_PRODUCT_PRICES, loadingProductPrices: true })
      const resp = await customAxios.get("/product/updateprices");
      dispatch({ type: LOADING_PRODUCT_PRICES, loadingProductPrices: false })
      cleanProductsFn();
      saveErrorFromServerFn(false);

    } catch (error:any) {
      console.log(error);
      
        if (error.response?.status == "404") { 
          await searchProductByFn(state.searchFormValue);
          setSelectedProductFn({} as ProductInf); //esto es nuevo, al pedir toda la lista se reinica la selección
          dispatch({ type: LOADING_FORM, loadingForm: false })

        }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          dispatch({type: LOADING_FORM, loadingForm: false });
          dispatch({type: PRODUCTS_ERROR})
          await logOut();

        }else {
          dispatch({ type: LOADING_FORM, loadingForm: false })
          dispatch({type: PRODUCTS_ERROR})
          saveErrorFromServerFn(true);
        }
    }
    
        
  }

  return (
    <productContext.Provider
      value={{
        selectedProduct: state.selectedProduct,
        selectOption: state.selectOption,
        productList: state.productList,
        searchFormValue: state.searchFormValue,
        msjSuccess : state.msjSuccess,
        msjError : state.msjError,
        loadingForm: state.loadingForm,
        loadingProduct: state.loadingProduct,
        loadingProductPrices: state.loadingProductPrices,
        cleanProductsFn,
        setSelectedProductFn,
        setSelectOptionFn,
        searchProductByFn,
        createProductFn,
        updateProductFn,
        deleteProductFn,
        updateProductPricesFn
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductProvider;
