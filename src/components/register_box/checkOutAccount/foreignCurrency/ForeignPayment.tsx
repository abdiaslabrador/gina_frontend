import React, {Fragment, useState, useContext, useEffect} from "react";
import { Modal } from "@nextui-org/react";
import { Loading } from "@nextui-org/react";
import comunModalCss from "../../../../styles/modal.module.css";
import foreignPaymentCss from "./ForeignPayment.module.css";
// import customAxios from "../../../config/axios";
import { foreignPaymentContext } from "../../../../context/register_box/checkOut/foreignPayment/foreignPaymentContext";
import { checkOutAccountContext } from "../../../../context/register_box/checkOut/checkOutAccount/checkOutAccountContext";
import { paymentMadeContext } from "../../../../context/register_box/checkOut/paymentMade/paymentMadeContext";
import { docAccountContext } from "../../../../context/register_box/documentAccount/docAccountContext";

const ForeignPayment = () => {
  const { total } = useContext(docAccountContext);
  const { foreignPaymentList, loadingForeignPayments, selectedForeignPayment, getForeignPaymentsFn, setSelectedForeignMethodFn } = useContext(foreignPaymentContext);
  const { addForeignPayment } = useContext(paymentMadeContext);
  const { checkout_balance, checkout_payed } = useContext(checkOutAccountContext);
  const [currency_amount, setCurrencyAmount] = useState(0);
  const [detail, setDetail] = useState("");
  const [visible, setVisible] = useState(false);
// const { currency, } = useContext( currencyContext );

  const handler = async () => { 
    getForeignPaymentsFn();
    // setCurrencyAmount(checkout_balance);
    setVisible(true);
  }

  const closeHandler = () => {
    setSelectedForeignMethodFn(null);
    setCurrencyAmount(0);
    setDetail("");
    setVisible(false);
  };

  function selectedMethod(paymentType : any){
    setSelectedForeignMethodFn(paymentType);
    setCurrencyAmount(Number((checkout_balance / paymentType.currency.today_currency).toFixed(2)));
  }

  function amountOnChange(e : any):void{
    setCurrencyAmount(e.target.value)
  }

  function detailOnChange(e : any):void{
    setDetail(e.target.value);
  }
  
  function formHandler(e : any){
      e.preventDefault();
      if(currency_amount > 0){
        addForeignPayment(Number(currency_amount), detail);
      }
      setVisible(false);
  }

  return (
    <Fragment>
      <button
          className="button_form__button button_form__button--efect"
          onClick={handler}
          disabled={ checkout_payed >= total }
      >
        Extranjero
      </button>
      <Modal
        animated={false}
        width="600px"
        css={{ height: "600px", backgroundColor: "#302F2F" }}
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
            <h3 className={foreignPaymentCss["title"]}>Tipos de pagos extranjeros</h3>
        </Modal.Header>
        <Modal.Body>
       
            { (!loadingForeignPayments)?
            <Fragment>
                { (foreignPaymentList?.length > 0) ? 
                <div className={foreignPaymentCss["content"]}>
                    <div className={foreignPaymentCss["button_side"]}>
                      
                              <Fragment>
                                {foreignPaymentList.map((fPayment, index) => (
                                  <div
                                    key={fPayment.id}
                                    onClick={()=>selectedMethod(fPayment)}
                                    className="button_form__button button_form__button--efect"
                                  >
                                    {fPayment.name}
                                  </div>
                                ))}
                              </Fragment>
                    </div>

                  <div className={foreignPaymentCss["input_side"]}>
                  <div className={comunModalCss["form_group"]}>
                        <div className={comunModalCss["form_group__label"]}>
                          <label>Tipo pago:</label>
                        </div>
                          <div style={{color: "white"}}>{(selectedForeignPayment)? <h3> {selectedForeignPayment?.name} </h3> : <h4> No seleccionado </h4>}</div>
                      </div>
                      <form onSubmit={formHandler}>
                      <div className={comunModalCss["form_group"]}>
                        <div className={comunModalCss["form_group__label"]}>
                          <label>Monto:</label>
                        </div>
                          <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            name="currency_amount"
                            required={true}
                            value={ currency_amount }
                            onChange={amountOnChange}
                            disabled={!selectedForeignPayment}
                          />
                      </div>
                      <div className={comunModalCss["form_group"]}>
                        <div className={comunModalCss["form_group__label"]}>
                          <label>Detalle:</label>
                        </div>
                        <textarea value={detail} onChange={detailOnChange} disabled={!selectedForeignPayment} />
                      </div>
                      <div className={foreignPaymentCss["add_payment"]}>
                        <button 
                          type="submit" 
                          disabled={!selectedForeignPayment}
                          className="button_form__button button_form__button--efect">
                            
                            Incluir
                        </button>
                      </div>
                      </form>
                  </div>
                </div>
                :
                  <h4 style={{color : "white"}}>No hay tipos de pagos</h4>
                }
            </Fragment>:
              <Loading
              type="spinner"
              color="white"
              size="xl"
              /> 
            }
        </Modal.Body>
        <Modal.Footer>
           <div className={comunModalCss["footer_container"]}>
            {/* {( msjSuccess )?(<div className={comunModalCss["msj_success"]}>{msjSuccess}</div>): null}
            {( msjError )?(<div className={comunModalCss["msj_error"]}>{msjError}</div>):null} */}
           </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ForeignPayment;
