import React, { Fragment, useContext } from "react";
import { Modal, Button } from "@nextui-org/react";
import { Loading } from "@nextui-org/react";
import { registerBoxContext } from "../../../context/register_box/register_box/registerBoxContext";
import { docAccountContext } from "../../../context/register_box/documentAccount/docAccountContext";
import { paymentMadeContext } from "../../../context/register_box/checkOut/paymentMade/paymentMadeContext";
import { checkOutAccountContext } from "../../../context/register_box/checkOut/checkOutAccount/checkOutAccountContext";
import cajaCss from "../register_box/Caja.module.css";


const CancelPurchase = () => {
  const [visible, setVisible] = React.useState(false);
  // const [mensaje, setMensaje] = React.useState(
  //   "¿Estas seguro de cancelar la compra?"
  // );
  const { client, cleanRegisterBoxFn } = useContext( registerBoxContext );
  const { cleanDocumentAccountFn } = useContext( docAccountContext );
  const { cleanPaymentMadeFn } = useContext( paymentMadeContext );
  const { cleanCheckOutAccountFn } = useContext( checkOutAccountContext );
  
  
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const cancelPurchase = async () => {
    cleanRegisterBoxFn();
    cleanDocumentAccountFn();
    cleanPaymentMadeFn();
    cleanCheckOutAccountFn();
    setVisible(false);
  };
  
  return (
    <Fragment>
      <button
        className={`${cajaCss["options__items"]} ${ (!client) ? (cajaCss["options__items--disable"])  : cajaCss["options__items--enable"]} `}
        // {cajaCss["options__items"]}
        onClick={handler}
        disabled={ (!client) ? true  : false }
      >
        <i className="fa-solid fa-ban"></i>
      </button>

      <Modal
        closeButton
        // ={!loadingForm}
        preventClose
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        {/* <Modal.Header>
            
        </Modal.Header> */}
        <Modal.Body>
          {/* {(loadingForm) ? ( <Loading /> ) : (<div>{mensaje}</div>)} */}
          ¿Está seguro de anular la compra?
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={cancelPurchase} /*disabled={loadingForm}*/>
              Si
            </Button>

            <Button auto onClick={closeHandler} /*disabled={loadingForm}*/ >
              No
            </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CancelPurchase;