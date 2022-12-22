import moment from "moment";
import React, {useContext, useReducer} from "react";
import { useRouter } from "next/router";
import customAxios from "../../config/axios";
import authReducer from "./authReducer";
import { GET_USER, 
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOG_OUT,
  LOADING_FORM,
  UPDATE_USER,
  UPDATE_MSJ_SUCCESS,
  LOADING_FORM_PASSWORD,
  UPDATE_USER_PASSWORD
} from "./authTypes";
import {authContext} from './authContext';
import {errorServerContext} from '../error/errorServerContext';
import {EmployeeInf} from '../../interface/EmployeeInf'
interface props {
  children: JSX.Element | JSX.Element[];
}

const AuthProvider = ({ children }: props) => {
  const {saveErrorFromServerFn} = useContext(errorServerContext);
  const router = useRouter();

  const initialState = {
    user: null,
    message: "",
    authenticated: false,
    loadingForm: false,
    loadingPasswordForm: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const singIn = async (email: string, password: string) => {
    //el token se asigna en el backend
    try {
      const resp = await customAxios.post("/auth/login", {
        email: email,
        password: password,
      });
      dispatch({ type: LOGIN_SUCCESS });
      router.push("/");
    } catch (error: any) {
      console.log(error);
      let message = error.response.data?.msg || error.message;

      dispatch({
        type: LOGIN_ERROR,
        message: message,
      });
    }
  };

  const userAuthenticated = async () => {
    try {
      
      const resp = await customAxios.get("/auth");
      dispatch({
        type: GET_USER,
        user: {...resp.data, birthday : moment(resp.data.birthday).format("YYYY-MM-DD")},
      });
      saveErrorFromServerFn(false);
    } catch (error: any) {
      console.log(error);
      let message = error.response.data?.msg || error.message;
      if (error.response?.status == "403") {
        //usuario con el token inválido
        //NOTA: ya el token se elimina desde el backend
        dispatch({
          type: LOGIN_ERROR,
          message: message,
        });
        router.push("/login");
      } else {
        saveErrorFromServerFn(true);
        
      }
    }
  };

  const logOut = async () => {
    try {
      await deleteTokenCookie();
      dispatch({
        type: LOG_OUT,
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTokenCookie = async () => {
    try {
      await customAxios.get("/auth/delete-token");
    } catch (error: any) {
      console.log(error);
    }
  };

  async function updateEmployeeFn(cuerrentUser : EmployeeInf){
    try {
      dispatch({ type: LOADING_FORM, loadingForm: true })
      await customAxios.post("employee/update", {
        id: cuerrentUser.id,
        email: cuerrentUser.email,
        name: cuerrentUser.name,
        last_name: cuerrentUser.last_name,
        ci_rif: cuerrentUser.ci_rif,
        phone_number: cuerrentUser.phone_number,
        direction: cuerrentUser.direction,
        birthday: cuerrentUser.birthday,
        active: cuerrentUser.active,
        secretary: cuerrentUser.secretary,
        superuser: cuerrentUser.superuser,
      });
      dispatch({
        type: UPDATE_USER,
        user: cuerrentUser,
        message: "Datos actualizados",
        loadingForm: false,
      })
      setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, message:""}), 8000);
      saveErrorFromServerFn(false);

    } catch (error : any) {
      dispatch({ type: LOADING_FORM, loadingForm: false })
      console.log(error);

      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      }else {
        saveErrorFromServerFn(true);
      }
    }
  }

  async function updateEmployeePasswordFn(userId : number, password: string){
    try {
      dispatch({ type: LOADING_FORM_PASSWORD, loadingPasswordForm: true })
      await customAxios.post("employee/updatepassword", {
        id: userId,
        password: password,
      });
      dispatch({
        type: UPDATE_USER_PASSWORD,
        message: "Contraseña cambiada exitosamente",
        loadingPasswordForm: false,
      })
      setTimeout(() => dispatch({type:UPDATE_MSJ_SUCCESS, message:""}), 8000);
      saveErrorFromServerFn(false);

    } catch (error : any) {
      dispatch({ type: LOADING_FORM_PASSWORD, loadingPasswordForm: false })
      console.log(error);

      if (error.response?.status == "403") { //usuario con el token inválido. NOTA: ya el token se elimina desde el backend
        await logOut();

      }else {
        saveErrorFromServerFn(true);
      }
    }
  }

  return (
    <authContext.Provider
      value={{
        user: state.user,
        message: state.message,
        loadingForm: state.loadingForm,
        loadingPasswordForm: state.loadingPasswordForm,
        singIn,
        userAuthenticated,
        logOut,
        updateEmployeeFn,
        updateEmployeePasswordFn
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
