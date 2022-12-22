import React, {useContext, useReducer} from "react";
import { useRouter } from "next/router";
import customAxios from "../../../config/axios";
import {errorServerContext} from '../../error/errorServerContext';
import {currencyContext} from '../../../context/register_box/currency/currencyContext';
import {authContext} from '../../login/authContext';
import {ProductInf} from "../../../interface/productInf";
import {ProductRegisterBoxInf} from "../../../interface/registerBoxInf";
import registerBoxReducer from "./registerBoxReducer";
import {registerBoxContext} from './registerBoxContext';
import {
  GET_CLIENT, 
  LOADING_CLIENT,
  CANCEL_PURCHASE,
  ADD_TO_LIST,
  TAKEOUT,
  SET_SELECTED_PRODUCT,
  LOADING_PRODUCT_REGISTERBOX,
  GET_PRODUCT_REGISTERBOX,
  UPDATE_ACCOUNT,

 } from "./registerBoxType";

interface props {
  children: JSX.Element | JSX.Element[];
}

const RegisterBoxProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { currency } = useContext(currencyContext);
  const { logOut } = useContext(authContext);

  const initialState = {
    client : null,
    productListRegisterBox : [],
    selectedProductRegisterBox : {} as ProductRegisterBoxInf,
    subtotal: 0 ,
    discount: 0 ,
    dolares: 0 ,
    total: 0 ,
    productApiRegisterBox: {} as ProductInf,
    loadingProductRegisterBox: false,
    loadingClient: false,

    // msjSuccess : "",
    // msjError : "",
    // loadingForm: false,
  };

  const [state, dispatch] = useReducer(registerBoxReducer, initialState);
  
  function setSelectedProductRegisterBoxFn(product: ProductRegisterBoxInf) {
    dispatch({
      type: SET_SELECTED_PRODUCT,
      selectedProductRegisterBox: product
    })
  }

  function cancelThePurchaseFn(){
    dispatch({type:CANCEL_PURCHASE})
  }

  async function getProductRegisterBoxFn(code : string){
    try {
      dispatch({type: LOADING_PRODUCT_REGISTERBOX, loadingProductRegisterBox: true });
      const resp = await customAxios.post("/product/searchby", {
        selectValue: code,
        selectOption : "code"
      })
      dispatch({
        type: GET_PRODUCT_REGISTERBOX,
        productApiRegisterBox: resp.data[0],
        loadingProductRegisterBox: false
      })

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: LOADING_PRODUCT_REGISTERBOX, loadingProductRegisterBox: false });
      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        // limpiar todo        
        await logOut();
      } else {
        saveErrorFromServerFn(true);
      }
    }
  }

  function updateAccountFn(){
    let subtotalAccount : number = 0;
    let dolaresAccount : number = 0;

    state.productListRegisterBox.forEach((product : ProductRegisterBoxInf) =>{
      subtotalAccount = subtotalAccount + product.subtotal;
    })
    dolaresAccount = subtotalAccount / currency.today_currency;

    dispatch({type:UPDATE_ACCOUNT, 
      subtotal: Number(subtotalAccount.toFixed(2)),
      dolares: Number(dolaresAccount.toFixed(2)),
      total:  Number((subtotalAccount - state.discount).toFixed(2))
    })
  }
  
  function addToRegisterBoxListFn(product : ProductRegisterBoxInf){
    let indexProduct : number = -1;
    let productFound : ProductRegisterBoxInf = state.productListRegisterBox.find( (element : ProductRegisterBoxInf, index : number) => 
      {   
          indexProduct = index;
          return element.id == product.id;
      })
    let arrayCopy = state.productListRegisterBox.copyWithin(0, state.productListRegisterBox.length);
      
    if(productFound){
      arrayCopy.splice(indexProduct, 1, product)
    }else{
      arrayCopy = [...arrayCopy, product]
    }
    
    dispatch({type:ADD_TO_LIST,
              productListRegisterBox: [...arrayCopy],
            })
  }

  function takeOutProductRegisterBoxFn(productId : number){
    dispatch({type:TAKEOUT, 
      productListRegisterBox: state.productListRegisterBox.filter( (product : ProductRegisterBoxInf) => product.id != productId)
    })
  }

  async function searchClientByCiRegisterBoxFn(ci_rif:string){
    try {
      dispatch({type: LOADING_CLIENT, loadingClient: true });
      const response = await customAxios.post("/client/getbyci",{
        ci_rif : ci_rif
      });
      dispatch({
        type: GET_CLIENT,
        client: response.data,
        loadingClient: false
      })
      saveErrorFromServerFn(false);

    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({type: LOADING_CLIENT, loadingClient: false });
      if(error.response?.status == "404"){
        dispatch({
          type: GET_CLIENT,
          client: null,
          loadingClient: false
        })
      } else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        // dispatch({type: BOX_ERROR})
        await logOut();

      } else {
        saveErrorFromServerFn(true);
      }
    }
  }

  // function takeOutProductRegisterBoxFn(productId : number){
  //   let subtotalAccount : number = 0;
  //   let dolaresAccount : number = 0;
  //   let arrayCopy = state.productListRegisterBox.filter( (product : ProductRegisterBoxInf) => product.id != productId)
  //   arrayCopy.forEach((product : ProductRegisterBoxInf) =>{
  //     subtotalAccount = subtotalAccount + product.subtotal;
  //   })
  //   dolaresAccount = subtotalAccount / currency.today_currency;

  //   dispatch({type:TAKEOUT, 
  //     productListRegisterBox: arrayCopy,
  //     subtotal: Number(subtotalAccount.toFixed(2)),
  //     dolares: Number(dolaresAccount.toFixed(2)),
  //     total:  Number((subtotalAccount - state.discount).toFixed(2))
  //   })
  // }

  // function addToRegisterBoxListFn(product : ProductRegisterBoxInf){
  //   let subtotalAccount : number = 0;
  //   let dolaresAccount : number = 0;
  //   let indexProduct : number = -1;
  //   let productFound : ProductRegisterBoxInf = state.productListRegisterBox.find( (element : ProductRegisterBoxInf, index : number) => 
  //     {   
  //         indexProduct = index;
  //         return element.id == product.id;
  //     })
  //   let arrayCopy = state.productListRegisterBox.copyWithin(0, state.productListRegisterBox.length);
      
  //   if(productFound){
  //     arrayCopy[indexProduct] = product;
  //     arrayCopy.forEach((product : ProductRegisterBoxInf) =>{
  //       subtotalAccount = subtotalAccount + product.subtotal;
  //     })
  //     dolaresAccount =  subtotalAccount / currency.today_currency;      
  //   }else{
  //     arrayCopy = [...arrayCopy, product]
  //     arrayCopy.forEach((product : ProductRegisterBoxInf) =>{
  //       subtotalAccount = subtotalAccount + product.subtotal;
  //     })
  //     dolaresAccount =  subtotalAccount / currency.today_currency;
  //   }
  //   dispatch({type:ADD_TO_LIST, 
  //             productListRegisterBox: arrayCopy,
  //             subtotal: Number(subtotalAccount.toFixed(2)),
  //             dolares: Number(dolaresAccount.toFixed(2)),
  //             total:  Number((subtotalAccount - state.discount).toFixed(2))
  //           })
  // }

  return (
    <registerBoxContext.Provider
      value={{
        selectedProductRegisterBox: state.selectedProductRegisterBox,
        productListRegisterBox: state.productListRegisterBox,
        subtotal: state.subtotal,
        discount: state.discount,
        dolares: state.dolares,
        total: state.total,
        client : state.client,
        productApiRegisterBox: state.productApiRegisterBox,
        loadingProductRegisterBox: state.loadingProductRegisterBox,
        loadingClient: state.loadingClient,

        // loadingForm : state.loadingForm,
        // msjSuccess : state.msjSuccess,
        // msjError : state.msjError,
        // loadingProduct : state.loadingProduct,

        setSelectedProductRegisterBoxFn,
        searchClientByCiRegisterBoxFn,
        takeOutProductRegisterBoxFn,
        addToRegisterBoxListFn,
        cancelThePurchaseFn,
        getProductRegisterBoxFn,
        updateAccountFn
      }}
    >
      {children}
    </registerBoxContext.Provider>
  );
};

export default RegisterBoxProvider;
