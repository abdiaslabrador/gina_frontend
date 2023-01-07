import React, { Fragment, useEffect, useContext } from "react";
import  customAxios  from "../../../config/axios";
import cajaCss from "./Caja.module.css";
import InventoryProvider from '../../../context/register_box/inventory/inventoryState';
import ProductProvider from '../../../context/register_box/product/productState';
import BillProvider from '../../../context/register_box/bill/billState';
import CheckOutAccountProvider from '../../../context/register_box/checkOut/checkOutAccount/checkOutAccountState';
import FinishPurchaseProvider from '../../../context/register_box/checkOut/finishPurchase/finishPurchaseState';
import PaymentMadeProvider from '../../../context/register_box/checkOut/paymentMade/paymentMadeState';
import NatPaymentProvider from '../../../context/register_box/checkOut/nationalPayment/natPaymentState';
import ForeignPaymentProvider from '../../../context/register_box/checkOut/foreignPayment/foreignPaymentState';
import Client from "../client/Client";
import Currency from "../currency/Currency";
import CiandDiscountBar from "./CiandDiscountBar";
import CheckOut from "../checkOutAccount/CheckOut";
import Inventory from "../inventory/Inventory";
import TakeOutProduct from "../takeOutProduct/TakeOutProduct";
import CancelPurchase from "../cancelPurchase/CancelPurchase";
import ProductManager from "../product/ProductManager";
import ClientInfo from "./ClientInfo";
import PayInfo from "./PayInfo";
import EditProduct from "../editProduct/EditProduct";
import { currencyContext } from "../../../context/register_box/currency/currencyContext";
import RegisterBoxTable from "./RegisterBoxTable";
import BillManager from "../bill/BillManager";

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
            <ForeignPaymentProvider>
              <NatPaymentProvider>
                <PaymentMadeProvider>
                  <CheckOutAccountProvider>
                  <FinishPurchaseProvider>
                    <CheckOut/>{/* Si necesita los provaiders */}
                    <TakeOutProduct/>{/* Este solo está por diseño de colocaión de botónes, no necesita los provaiders de arriba */}
                    <EditProduct/>{/* Este solo está por diseño de colocaión de botónes, no necesita los provaiders de arriba */}
                    <CancelPurchase/>{/* Si necesita los provaiders */}
                    </FinishPurchaseProvider>
                  </CheckOutAccountProvider>
                </PaymentMadeProvider>
              </NatPaymentProvider>
            </ForeignPaymentProvider>

            
            <ProductProvider>
              <ProductManager/>
            </ProductProvider>
            {/* <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-floppy-disk"></i>
            </div> */}
            {/* <div className={cajaCss["options__items"]} onClick={cancelThePurchase}>
              <i className="fa-solid fa-ban"></i>
            </div> */}
            <BillProvider>
                <BillManager/>
            </BillProvider>

            {/* <div className={cajaCss["options__items"]}>
              <i className="fa-solid fa-cash-register"></i>
            </div> */}
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
