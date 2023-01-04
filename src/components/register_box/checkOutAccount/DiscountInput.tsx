import React, { useState, useContext } from "react";
import customAxios from "../../../config/axios";
import  discountInputCss from "./DiscountInput.module.css";
import { docAccountContext } from "../../../context/register_box/documentAccount/docAccountContext";

const DiscountInput = () => {
    const { subtotal, discount, setDiscountFn } = useContext( docAccountContext );
  
  function discountOnChange(e : any):void{
    let discountInput = Number(e.target.value);
    if(discountInput >= 0 && discountInput <= subtotal ){
      setDiscountFn(discountInput) //el casting convierte el "" a 0
    }
  }

  return (
    <div className={discountInputCss["buttom_form__discount"]}>
        <label style={{color:"white"}}>Descuento: </label>
        <input className={discountInputCss["buttom_form__box"]}
        type="number"
        min="0"
        step="0.01"
        name="discount"
        onChange={discountOnChange}
        value={ (discount==0)? "" : discount }
        />
    </div>
  );
};

export default DiscountInput;
