import React, { useState, useContext } from "react";
import { Modal, Button } from "@nextui-org/react";
import { Loading } from "@nextui-org/react";
import { finishPurchaseContext } from "../../../context/register_box/checkOut/finishPurchase/finishPurchaseContext";
import { docAccountContext } from "../../../context/register_box/documentAccount/docAccountContext";
import { checkOutAccountContext } from "../../../context/register_box/checkOut/checkOutAccount/checkOutAccountContext";

const FinishPurchase = () => {
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState(
    "¿Estas seguro de finalizar la compra?"
  );
  
  const { loadingDocumentInfo, finishPurchaseFn } = useContext( finishPurchaseContext );
  const { total } = useContext( docAccountContext );
  const { checkout_payed } = useContext( checkOutAccountContext );
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const finishPurchase = async () => {
    await finishPurchaseFn();
    setVisible(false);

  };
  
  return (
    <div>
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
        disabled={(total == 0 || checkout_payed<total) ? true : false}
      >
        {(!loadingDocumentInfo)?
          <div>Finalizar</div>
        :
        (<Loading
          type="spinner"
          color="currentColor"
          size="sm"
        />)
        }
      </button>

      <Modal
        closeButton={!loadingDocumentInfo}
        preventClose
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        {/* <Modal.Header>
            
        </Modal.Header> */}
        <Modal.Body>
            {
              loadingDocumentInfo ?
                ( <Loading /> )
                : 
                <div>{mensaje}</div>
            } 
        </Modal.Body>
        <Modal.Footer>
        <Button auto flat color="error" 
          onClick={() => finishPurchase()}
         >
            Si
        </Button>
        <Button auto onClick={closeHandler} >
            No
        </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FinishPurchase;