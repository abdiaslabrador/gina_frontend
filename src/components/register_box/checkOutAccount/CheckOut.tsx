import React, { Fragment, useContext } from "react";
import { Modal, Button } from "@nextui-org/react";
import { registerBoxContext } from "../../../context/register_box/register_box/registerBoxContext";
import { paymentMadeContext } from "../../../context/register_box/checkOut/paymentMade/paymentMadeContext";
import cajaCss from "../register_box/Caja.module.css";
import PayInfo from "../register_box/PayInfo";
import DeletePayment  from "./DeletePayment";
import ClientPayment  from "./ClientPayment";
import DiscountInput  from "./DiscountInput";
import FinishPurchase  from "./FinishPurchase";
import checkOutCss from "./CheckOut.module.css";
import NationalPayment from "./nationalPayment/NationalPayment";
import ForeignPayment from "./foreignCurrency/ForeignPayment";
import { PaymentMadeInf } from "../../../interface/checkOut/paymentMadeInf";

const CheckOut = () => {
  const [visible, setVisible] = React.useState(false);
  const { client, productListRegisterBox, productBadCantList } = useContext( registerBoxContext );
  const { paymentMadeList, selectedPaymentMade,  setSelectedPaymentMadeFn } = useContext( paymentMadeContext );
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  function objectSelection(payment: PaymentMadeInf): void {
    setSelectedPaymentMadeFn(payment);
  }
  
  return (
    <Fragment>
      <button
        className={ `${cajaCss["options__items"]} } ${ (productListRegisterBox.length == 0 || !client) ? (cajaCss["options__items--disable"])  : (cajaCss["options__items--enable"]) } `}
        onClick={handler}
        disabled={ (productListRegisterBox.length == 0 || !client) ? true : false}
      >
        <i className="fa-solid fa-equals"></i>
      </button>

      <Modal
        animated={false}
        width="90%"
        css={{ height: "600px", backgroundColor: "#302F2F" }}
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <h3 className={checkOutCss["title"]}>Totalizar</h3>
        </Modal.Header>
        <Modal.Body>
        <div className={checkOutCss["payment_amounts_side"]}>
            <PayInfo/>
            <ClientPayment/>
        </div>
        {(productBadCantList.length > 0)?
          <div className={checkOutCss["check_product_cant"]}>
            <div>Corrija los productos para procesar la compra:</div>
            {productBadCantList.map((product, index) => (
              <div
                key={index}
              >
                - "{product.description}" cantidad disponible {product.cant}, cantidad que quiere llevar {productListRegisterBox.find(productRegisterBox => productRegisterBox.id == product.id)?.cant}
              </div>
            ))}
          </div>
          :
          null
        }
          <div className={checkOutCss["product_list"]}>
            <div className={checkOutCss["product_list__titles"]}>
              <div>Fecha</div>
              <div>Tipo</div>
              <div>Tasa</div>
              <div>Moneda</div>
              <div>Monto $</div>
              <div>Monto Bs</div>
              <div>Detalle</div>
            </div>
                  <div className={checkOutCss["product_list__products"]}> 
                    
                    {(paymentMadeList?.length > 0) ? 
                      (<Fragment>
                        {paymentMadeList.map((paymentMade, index) => (
                          <div
                            key={index}
                            style={
                              paymentMade.payment_date === selectedPaymentMade?.payment_date
                                ? { backgroundColor: "#313030" }
                                : {}
                            }
                            className={checkOutCss["product_list__item"]}
                            onClick={() => objectSelection(paymentMade)}
                          >
                            <div className={checkOutCss["payment_date"]}>{paymentMade.payment_date.toLocaleDateString()}</div>
                            <div className={checkOutCss["paymentType_name"]}>{paymentMade.paymentType_name}</div>
                            <Fragment>
                              {
                                (paymentMade.currency_day_value)?
                                (<div className={checkOutCss["currency_day_value"]}>{paymentMade.currency_day_value}</div>):
                                (<div className={checkOutCss["currency_day_value"]}>N/A</div>)
                              }
                            </Fragment>
                            <div className={checkOutCss["currency_name"]}>{paymentMade.currency_name}</div>
                            <Fragment>
                              {
                                (paymentMade.currency_amount)?
                                (<div className={checkOutCss["currency_amount"]}>{paymentMade.currency_amount}</div>):
                                (<div className={checkOutCss["currency_amount"]}>N/A</div>)
                              }
                            </Fragment>
                            <div className={checkOutCss["amount"]}>{paymentMade.amount}</div>
                            <div className={checkOutCss["detail"]}>{paymentMade.detail}</div>
                          </div>
                        ))}
                      </Fragment>
                      ):
                      (null)
                    }  
                   
                  </div> 
          </div>

          <div className={checkOutCss["delete_bottom"]}>
            <DeletePayment/>
            <DiscountInput/>
          </div>

          <div className={checkOutCss["payment_types_side"]}>
            <NationalPayment/>
            <ForeignPayment/>
          </div>
          
          <div className={checkOutCss["check_out_botton"]}>
            <FinishPurchase/>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default CheckOut;
