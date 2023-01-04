import React, {Fragment, useState, useContext, useEffect} from "react";
import { Modal } from "@nextui-org/react";
import { Loading } from "@nextui-org/react";
import comunModalCss from "../../../../styles/modal.module.css";
import natPaymentCss from "./NationalPayment.module.css";
// import customAxios from "../../../config/axios";
import { natPaymentContext } from "../../../../context/register_box/checkOut/nationalPayment/natPaymentContext";
import { checkOutAccountContext } from "../../../../context/register_box/checkOut/checkOutAccount/checkOutAccountContext";
import { paymentMadeContext } from "../../../../context/register_box/checkOut/paymentMade/paymentMadeContext";
import { docAccountContext } from "../../../../context/register_box/documentAccount/docAccountContext";

const NationalPayment = () => {
  const { total } = useContext(docAccountContext);
  const { nationalPaymentList, loadingNatPayments, selectedNatPayment, getNatPaymentsFn, setSelectedNatMethodFn } = useContext(natPaymentContext);
  const { addNationalPayment } = useContext(paymentMadeContext);
  const { checkout_balance, checkout_payed } = useContext(checkOutAccountContext);
  const [amount, setAmount] = useState(0);
  const [detail, setDetail] = useState("");
  const [visible, setVisible] = useState(false);
//   const { currency, } = useContext( currencyContext );

  const handler = async () => { 
    getNatPaymentsFn();
    setAmount(checkout_balance);
    setVisible(true);
  }

  const closeHandler = () => {
    setSelectedNatMethodFn(null);
    setAmount(0);
    setDetail("");
    setVisible(false);
  };

  function selectedMethod(paymentType : any){
    setSelectedNatMethodFn(paymentType)
  }

  function amountOnChange(e : any):void{
    setAmount(e.target.value)
  }

  function detailOnChange(e : any):void{
    setDetail(e.target.value);
  }
  
  function formHandler(e : any){
      e.preventDefault();
      if(amount > 0){
        addNationalPayment(Number(amount), detail);
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
        Bolivares
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
            <h3 className={natPaymentCss["title"]}>Tipos de pagos nacionales</h3>
        </Modal.Header>
        <Modal.Body>
       
            { (!loadingNatPayments)?
            <Fragment>
                { (nationalPaymentList?.length > 0) ? 
                <div className={natPaymentCss["content"]}>
                    <div className={natPaymentCss["button_side"]}>
                      
                              <Fragment>
                                {nationalPaymentList.map((nPayment, index) => (
                                  <div
                                    key={nPayment.id}
                                    onClick={()=>selectedMethod(nPayment)}
                                    className="button_form__button button_form__button--efect"
                                  >
                                    {nPayment.name}
                                  </div>
                                ))}
                              </Fragment>
                    </div>

                  <div className={natPaymentCss["input_side"]}>
                  <div className={comunModalCss["form_group"]}>
                        <div className={comunModalCss["form_group__label"]}>
                          <label>Tipo pago:</label>
                        </div>
                          <div style={{color: "white"}}>{(selectedNatPayment)? <h3> {selectedNatPayment?.name} </h3> : <h4> No seleccionado </h4>}</div>
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
                            name="amount"
                            required={true}
                            value={ amount }
                            onChange={amountOnChange}
                            disabled={!selectedNatPayment}
                          />
                      </div>
                      <div className={comunModalCss["form_group"]}>
                        <div className={comunModalCss["form_group__label"]}>
                          <label>Detalle:</label>
                        </div>
                        <textarea value={detail} onChange={detailOnChange} disabled={!selectedNatPayment} />
                      </div>
                      <div className={natPaymentCss["add_payment"]}>
                        <button 
                          type="submit" 
                          disabled={!selectedNatPayment}
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

export default NationalPayment;
