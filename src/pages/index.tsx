import React, { useEffect, useContext } from "react";
import Head from "next/head";
import Router from "next/router";
import { NextPage, GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
// import customAxios from "../config/axios";
import ServerError from "../components/error/500";
// import {EmployeeInf} from "../interface/EmployeeInf";
import { authContext } from "../context/login/authContext";
import cajaCss from "../styles/Caja.module.css";
import WithLayout from "../components/layout/HocLayoutHeader";
import {errorServerContext} from '../context/error/errorServerContext';
import CurrencyProvider from '../context/register_box/currency/currencyState';
import Client from "../components/register_box/client/Client";
import Currency from "../components/register_box/currency/Currency";
import Inventory from "../components/register_box/inventory/Inventory";

const Caja: NextPage = () => {
  const { userAuthenticated } = useContext(authContext);
  const { errorFromServer } = useContext(errorServerContext);

  // useEffect(()=>{
  //   async function authCheck(){
  //    await userAuthenticated()
  //   }
  //   authCheck()
  // },[])

  return (
    <div>
      <Head>
        <title>Caja</title>
      </Head>
      {!errorFromServer ? (
        <div className={cajaCss["container"]}>
          <div className={cajaCss["client_info"]}>
            <div className={cajaCss["client_info__title"]}>Factura</div>
            <div className={cajaCss["client_info__content"]}>
              <div>Cliente: Abdias Daniel Labrador Peña</div>
              <div>Rif: 26185465</div>
              <div>Dirección: Barrio El Callao Av 49h Casa 176-147</div>
              <div>Factura: 22753</div>
            </div>
          </div>
          <div className={cajaCss["pay_info"]}>
            <div className={cajaCss["pay_info__title"]}>Sub-total</div>
            <div className={cajaCss["pay_info__count"]}>100</div>
            <div className={cajaCss["pay_info__title"]}>Descuento</div>
            <div className={cajaCss["pay_info__count"]}>10</div>
            <div
              className={`${cajaCss["pay_info__title"]} ${cajaCss["pay_info__title--aling"]}`}
            >
              Dolares
            </div>
            <div
              className={`${cajaCss["pay_info__count"]} ${cajaCss["pay_info__count--dollar"]}`}
            >
              1$
            </div>
            <div
              className={`${cajaCss["pay_info__title"]} ${cajaCss["pay_info__title--aling"]}`}
            >
              Total
            </div>
            <div
              className={`${cajaCss["pay_info__count"]} ${cajaCss["pay_info__count--total"]}`}
            >
              4000000000.00
            </div>
          </div>

          <div className={cajaCss["product_list"]}>
            <div className={cajaCss["product_list__titles"]}>
              <div>Código</div>
              <div>Descripción</div>
              <div>Cant</div>
              <div>Precio</div>
              <div>Ref</div>
              <div>Sub-Total</div>
            </div>
            <div className={cajaCss["product_list__products"]}>
              <div className={cajaCss["product_list__item"]}>
                <div className={cajaCss["code"]}>1234456</div>
                <div className={cajaCss["description"]}>
                  flaskjfj asdf l laksjdf jaslkjdfl kjaskljdfkl kjaskljdfkl
                </div>
                <div className={cajaCss["cant"]}>3</div>
                <div className={cajaCss["price"]}>850000000000</div>
                <div className={cajaCss["ref"]}>3</div>
                <div className={cajaCss["subtotal"]}>255000000000</div>
              </div>
              <div className={cajaCss["product_list__item"]}>
                <div className={cajaCss["code"]}>1234456</div>
                <div className={cajaCss["description"]}>
                  flaskjfj asdf l laksjdf jaslkjdfl kjaskljdfkl kjaskljdfkl
                </div>
                <div className={cajaCss["cant"]}>3</div>
                <div className={cajaCss["price"]}>850000000000</div>
                <div className={cajaCss["ref"]}>3</div>
                <div className={cajaCss["subtotal"]}>255000000000</div>
              </div>
            </div>
          </div>
          <div className={cajaCss["buttom_form"]}>
            <div className={cajaCss["button_form__button"]}>Buscar usuario</div>
            <div className={cajaCss["buttom_form__discount"]}>
              <label>Descuento: </label>
              <input className={cajaCss["buttom_form__box"]} />
            </div>
          </div>
          <div className={cajaCss["options"]}>
            <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-equals"></i>
            </div>
            <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-exclamation"></i>
            </div>
            <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-p"></i>
            </div>
            {/* <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-floppy-disk"></i>
            </div> */}
            <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-ban"></i>
            </div>
            <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-receipt"></i>
            </div>
            <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-cash-register"></i>
            </div>
            <Inventory/>
            <Client/>
            {/* <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-book"></i>
            </div> */}
            <CurrencyProvider>
              <Currency/>
            </CurrencyProvider>
            
          </div>
        </div>
      ) : (
        <div>
          <ServerError />
        </div>
      )}
    </div>
  );
};

// export async function getServerSideProps(ctx: GetServerSidePropsContext){
//   const {req, res} = ctx
//   const token  = getCookie("token", {req, res})

//   if (!token) {return {redirect: {destination: '/login',statusCode: 301,},}}

//   return {
//     props: {},
//   }
// }

export default WithLayout(Caja);
