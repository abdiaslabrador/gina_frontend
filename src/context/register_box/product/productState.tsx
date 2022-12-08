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

interface props {
  children: JSX.Element | JSX.Element[];
}

const ProductProvider = ({ children }: props) => {
  const { saveErrorFromServerFn } = useContext(errorServerContext);
  const { user, logOut } = useContext(authContext);
  const router = useRouter();

  const initialState = {
    selectedProduct : {} as ProductInf,
    proyectList : [],
    msjSuccess : "",
    msjError : "",
    loadingForm: false,
    loadingProyect: false,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  async function searchProductByCodeFn(code: string) {
      try {
        dispatch({ type: LOADING_PRODUCT, loadingProduct: true })
        const response = await customAxios.post("/product/getbycode",{
          code: code
        });
        dispatch({
          type: GET_PRODUCTS,
          productList: response.data,
          loadingProduct: false
        })
        saveErrorFromServerFn(false);
      } catch (error : any) {
        let message = error.response.data?.msg || error.message;
        dispatch({ type: LOADING_PRODUCT, loadingProduct: false })
        console.log(error);
        if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
          dispatch({
            type: PRODUCTS_ERROR,
            productList: [],
            selectedProduct: {} as ProductInf
            })
          await logOut();
        } else {
          saveErrorFromServerFn(true);
        }
      }
  }

  async function searchProductByDescriptionFn(description: string) {
    try {
      dispatch({ type: LOADING_PRODUCT, loadingProduct: true })
      const response = await customAxios.post("/product/getbydescription",{
        description: description
      });
      dispatch({
        type: GET_PRODUCTS,
        productList: response.data,
        loadingProduct: false
      })
      saveErrorFromServerFn(false);
    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({ type: LOADING_PRODUCT, loadingProduct: false })
      console.log(error);
      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        dispatch({
          type: PRODUCTS_ERROR,
          productList: [],
          selectedProduct: {} as ProductInf
          })
        await logOut();
      } else {
        saveErrorFromServerFn(true);
      }
    }
}

  async function searchProductByCantFn(cant: number) {
    try {
      dispatch({ type: LOADING_PRODUCT, loadingProduct: true })
      const response = await customAxios.post("/product/getbyrange",{
        cant: cant
      });
      dispatch({
        type: GET_PRODUCTS,
        productList: response.data,
        loadingProduct: false
      })
      saveErrorFromServerFn(false);
    } catch (error : any) {
      let message = error.response.data?.msg || error.message;
      dispatch({ type: LOADING_PRODUCT, loadingProduct: false })
      console.log(error);
      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        dispatch({
          type: PRODUCTS_ERROR,
          productList: [],
          selectedProduct: {} as ProductInf
          })
        await logOut();
      } else {
        saveErrorFromServerFn(true);
      }
    }
}
  // async function createEmployeeFn(product: any){
  //   try {
  //     dispatch({ type: LOADING_FORM, loadingForm: true })
  //     await customAxios.post("product/create", {
  //       email: product.email,
  //       name: product.name,
  //       last_name: product.last_name,
  //       ci_rif: product.ci_rif,
  //       phone_number: product.phone_number,
  //       direction: product.direction,
  //       birthday: product.birthday,
  //       active: product.active,
  //       secretary: product.secretary,
  //       superuser: product.superuser,
  //       password: product.password,
  //     });
  //     const response = await customAxios.get("/product/all");
  //       dispatch({
  //         type: CREATE_EMPLOYEE,
  //         productList: response.data,
  //         msjSuccess: "Usuario guardado exitosamente",
  //         msjError: "",
  //         loadingForm: false,
  //       })
  //       setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:""}), 8000);
  //       saveErrorFromServerFn(false);

  //   } catch (error : any ) {
  //     let message = error.response.data?.msg || error.message;
  //     dispatch({type: LOADING_FORM, loadingForm: false });
  //     console.log(error );

  //       if(error.response?.status == "400"){
  //         dispatch({type:UPDATE_MSJ_ERROR, msjError:message})
  //         setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjError:""}), 8000);
          
  //       }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //         dispatch({
  //           type: EMPLOYEES_ERROR,
  //           productList: [],
  //           selectedEmployee: {} as EmployeeInf
  //           })
  //         await logOut();

  //       }else {
  //         saveErrorFromServerFn(true);
  //       }
  //   }
  // }

  // function setSelectedEmployeeFn(product: EmployeeInf) {
  //     dispatch({
  //       type: SET_SELECTED_EMPLOYEE,
  //       selectedEmployee: product
  //     })
  // }

  // async function deleteEmployeeFn(employeId : number){
  //   try {
  //     dispatch({ type: LOADING_FORM, loadingForm: true })
  //     const resp = await customAxios.post("/product/delete", {id: employeId});
  //     dispatch({
  //       type: DELETE_EMPLOYEE,
  //       productList: resp.data,
  //       selectedEmployee: ({} as EmployeeInf),
  //       loadingForm: false
  //     })
  //     saveErrorFromServerFn(false);

  //   } catch (error:any) {
  //     console.log(error);
  //       if(error.response?.status == "404"){//el usuario no está
  //         try {
  //           const resp = await customAxios.get("/product/all");
  //           dispatch({
  //             type: EMPLOYEES_ERROR,
  //             productList: resp.data,
  //             selectedEmployee: {} as EmployeeInf
  //             })
  //           dispatch({type: LOADING_FORM, loadingForm: false });

  //         } catch (error :any) {
  //           if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //             dispatch({
  //               type: EMPLOYEES_ERROR,
  //               productList: [],
  //               selectedEmployee: {} as EmployeeInf
  //               })
  //             dispatch({type: LOADING_FORM, loadingForm: false });
  //             await logOut();
    
  //           }else {
  //             dispatch({
  //               type: EMPLOYEES_ERROR,
  //               productList: [],
  //               selectedEmployee: {} as EmployeeInf
  //               })
  //             dispatch({type: LOADING_FORM, loadingForm: false });
  //             saveErrorFromServerFn(true);
  //           }
  //         }

  //       }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //         dispatch({
  //           type: EMPLOYEES_ERROR,
  //           productList: [],
  //           selectedEmployee: {} as EmployeeInf
  //           })
  //         dispatch({type: LOADING_FORM, loadingForm: false });
  //         await logOut();

  //       }else {
  //         dispatch({
  //           type: EMPLOYEES_ERROR,
  //           productList: [],
  //           selectedEmployee: {} as EmployeeInf
  //           })
  //         dispatch({type: LOADING_FORM, loadingForm: false });
  //         saveErrorFromServerFn(true);
  //       }
  //   }
  // }

  // async function updateEmployeeFn(product : EmployeeInf){
  //   try {
  //     dispatch({ type: LOADING_FORM, loadingForm: true })
  //     await customAxios.post("product/update", {
  //       id: product.id,
  //       email: product.email,
  //       name: product.name,
  //       last_name: product.last_name,
  //       ci_rif: product.ci_rif,
  //       phone_number: product.phone_number,
  //       direction: product.direction,
  //       birthday: product.birthday,
  //       active: product.active,
  //       secretary: product.secretary,
  //       superuser: product.superuser,
  //     });
  //     const resp = await customAxios.get("/product/all");
  //     dispatch({
  //       type: UPDATE_EMPLOYEE,
  //       productList: resp.data,
  //       selectedEmployee: product,
  //       msjSuccess: "Empleado actualizado exitosamente",
  //       msjError: "",
  //       loadingForm: false,
  //     })
  //     setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:""}), 8000);
  //     saveErrorFromServerFn(false);

  //   } catch (error : any) {
  //     let message = error.response.data?.msg || error.message;
  //     console.log(error);

  //     if(error.response?.status == "404"){//el usuario se intenta actualizar pero no está en la base de datos
  //       dispatch({type:UPDATE_MSJ_ERROR, msjError:message})
  //       setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjError:""}), 8000);

  //       try {
  //         const resp = await customAxios.get("/product/all");
  //         dispatch({
  //           type: EMPLOYEES_ERROR,
  //           productList: resp.data,
  //           selectedEmployee: {} as EmployeeInf
  //           })
  //         dispatch({type: LOADING_FORM, loadingForm: false });

  //       } catch (error :any) {
  //         if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //           dispatch({
  //             type: EMPLOYEES_ERROR,
  //             productList: [],
  //             selectedEmployee: {} as EmployeeInf
  //             })
  //           dispatch({type: LOADING_FORM, loadingForm: false });
  //           await logOut();
  
  //         }else {
  //           dispatch({
  //             type: EMPLOYEES_ERROR,
  //             productList: [],
  //             selectedEmployee: {} as EmployeeInf
  //             })
  //           dispatch({type: LOADING_FORM, loadingForm: false });
  //           saveErrorFromServerFn(true);
  //         }
  //       }

  //     }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //       dispatch({
  //         type: EMPLOYEES_ERROR,
  //         productList: [],
  //         selectedEmployee: {} as EmployeeInf
  //         })
  //       dispatch({ type: LOADING_FORM, loadingForm: false })
  //       await logOut();
  //     }else {
  //       dispatch({
  //         type: EMPLOYEES_ERROR,
  //         productList: [],
  //         selectedEmployee: {} as EmployeeInf
  //         })
  //       dispatch({ type: LOADING_FORM, loadingForm: false })
  //       saveErrorFromServerFn(true);
  //     }
  //   }
  // }

  // async function updateEmployeePasswordFn(productId : number, password: string){
  //   try {
  //     dispatch({ type: LOADING_FORM_PASSWORD, loadingPasswordForm: true })
  //     await customAxios.post("product/updatepassword", {
  //       id: productId,
  //       password: password,
  //     });
  //     const resp = await customAxios.get("/product/all");
  //     dispatch({
  //       type: UPDATE_EMPLOYEE_PASSWORD,
  //       productList: resp.data,
  //       msjSuccess: "Contraseña cambiada exitosamente",
  //       msjError: "",
  //       loadingPasswordForm: false,
  //     })
  //     setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, msjSuccess:""}), 8000);
  //     saveErrorFromServerFn(false);
  //   } catch (error : any) {
  //     let message = error.response.data?.msg || error.message;
  //     console.log(error);

  //     if(error.response?.status == "404"){//el usuario se intenta actualizar pero no está en la base de datos
  //       dispatch({type:UPDATE_MSJ_ERROR, msjError:message})
  //       setTimeout(() => dispatch({type:UPDATE_MSJ_ERROR, msjError:""}), 8000);

  //       try {
  //         const resp = await customAxios.get("/product/all");
  //         dispatch({
  //           type: EMPLOYEES_ERROR,
  //           productList: resp.data,
  //           selectedEmployee: {} as EmployeeInf
  //           })
  //         dispatch({type: LOADING_FORM_PASSWORD, loadingPasswordForm: false });

  //       } catch (error :any) {
  //         if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //           dispatch({
  //             type: EMPLOYEES_ERROR,
  //             productList: [],
  //             selectedEmployee: {} as EmployeeInf
  //             })
  //           dispatch({type: LOADING_FORM_PASSWORD, loadingPasswordForm: false });
  //           await logOut();
  
  //         }else {
  //           dispatch({
  //             type: EMPLOYEES_ERROR,
  //             productList: [],
  //             selectedEmployee: {} as EmployeeInf
  //             })
  //           dispatch({type: LOADING_FORM_PASSWORD, loadingPasswordForm: false });
  //           saveErrorFromServerFn(true);
  //         }
  //       }

  //     }else if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
  //       dispatch({
  //         type: EMPLOYEES_ERROR,
  //         productList: [],
  //         selectedEmployee: {} as EmployeeInf
  //         })
  //       dispatch({ type: LOADING_FORM_PASSWORD, loadingPasswordForm: false })
  //       await logOut();
  //     }else {
  //       dispatch({
  //         type: EMPLOYEES_ERROR,
  //         productList: [],
  //         selectedEmployee: {} as EmployeeInf
  //         })
  //       dispatch({ type: LOADING_FORM_PASSWORD, loadingPasswordForm: false })
  //       saveErrorFromServerFn(true);
  //     }
  //   }
    
  // }

  return (
    <productContext.Provider
      value={{
        selectedProduct: state.selectedProduct,
        productList: state.productList,
        msjSuccess : state.msjSuccess,
        msjError : state.msjError,
        loadingForm: state.loadingForm,
        loadingProduct: state.loadingProduct,
        searchProductByCodeFn,
        searchProductByDescriptionFn,
        searchProductByCantFn,
        // setSelectedProductFn,
        // createProductFn,
        // deleteProductFn,
        // updateProductFn,
        // updateProductPasswordFn,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductProvider;
