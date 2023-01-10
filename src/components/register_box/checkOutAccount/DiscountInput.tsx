import React, { useState, useContext } from "react";
import customAxios from "../../../config/axios";
import  discountInputCss from "./DiscountInput.module.css";
import { docAccountContext } from "../../../context/register_box/documentAccount/docAccountContext";

const DiscountInput = () => {
    const {  setDiscountFn } = useContext( docAccountContext );
    const [discount, setDiscount] = useState(0);

  function discountOnChange(e : any){
      setDiscount(e.target.value) 
  }

  function formHandler(e : any){
    e.preventDefault();
    setDiscountFn(discount);
  }

  return (
    <div className={discountInputCss["buttom_form__discount"]}>
      <form onSubmit={formHandler}>
        <label style={{color:"white"}}>Descuento: </label>
        <input className={discountInputCss["buttom_form__box"]}
        type="number"
        min="0"
        max={100}
        step="0.01"
        name="discount"
        onChange={discountOnChange}
        value={ discount }
        />
        <button
            type="submit"
            className="button_form__button button_form__button--efect"
        >
            +
        </button>
        </form>
    </div>
  );
};

export default DiscountInput;
