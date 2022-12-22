import React, { Fragment, useEffect, useContext } from "react";
import  customAxios  from "../../../config/axios";
import cajaCss from "./Caja.module.css";
import InventoryProvider from '../../../context/register_box/inventory/inventoryState';
import ProductProvider from '../../../context/register_box/product/productState';
import Client from "../client/Client";
import Currency from "../currency/Currency";
import CiandDiscountBar from "./CiandDiscountBar";
import Inventory from "../inventory/Inventory";
import TakeOutProduct from "../takeOutProduct/TakeOutProduct";
import CancelPurchase from "../cancelPurchase/CancelPurchase";
import ProductManager from "../product/ProductManager";
import ClientInfo from "./ClientInfo";
import PayInfo from "./PayInfo";
import EditProduct from "../editProduct/EditProduct";
import { currencyContext } from "../../../context/register_box/currency/currencyContext";
import RegisterBoxTable from "./RegisterBoxTable";

const RegisterBox = () => {
  const { getCurrencyFn, } = useContext( currencyContext );

  useEffect(()=>{
    async function getCurrency(){
     await getCurrencyFn()
    }
    getCurrency()
  },[])

  return (
    <Fragment>
        <div className={cajaCss["container"]}>

          <ClientInfo/>
          <PayInfo/>

          <RegisterBoxTable/>
           <CiandDiscountBar/>                     
          <div className={cajaCss["options"]}>
            <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-equals"></i>
            </div>
            <TakeOutProduct/>
            <EditProduct/>
            <ProductProvider>
              <ProductManager/>
            </ProductProvider>
            {/* <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-floppy-disk"></i>
            </div> */}
            {/* <div className={cajaCss["options__items"]} onClick={cancelThePurchase}>
              <i className="fa-solid fa-ban"></i>
            </div> */}
            <CancelPurchase/>
            <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-receipt"></i>
            </div>
            <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-cash-register"></i>
            </div>
            <InventoryProvider>
                <Inventory/>
            </InventoryProvider> 

            <Client/>
            {/* <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-book"></i>
            </div> */}
            <Currency/>
            
          </div>
        </div>
    </Fragment>
  );
};

export default RegisterBox;
