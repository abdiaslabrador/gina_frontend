import React, { useState, useContext } from "react";
import { Modal, Button } from "@nextui-org/react";
import customAxios from "../../../config/axios";
import { paymentMadeContext } from "../../../context/register_box/checkOut/paymentMade/paymentMadeContext";

const DeletePayment = () => {
  const [visible, setVisible] = useState(false);
  const [mensaje, setMensaje] = useState(
    "¿Estas seguro de eliminar el pago?"
  );
  const { selectedPaymentMade, deletePaymentMadeFn } = useContext( paymentMadeContext );
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const deletePayment = () => {
    deletePaymentMadeFn(selectedPaymentMade.payment_date);
    setVisible(false);

  };
  
  return (
    <div>
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
        disabled={(!selectedPaymentMade?.payment_date) ? true : false}
      >
        Eliminar pago
      </button>

      <Modal
        closeButton
        preventClose
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        {/* <Modal.Header>
            
        </Modal.Header> */}
        <Modal.Body>
                <div>{mensaje}</div>
        </Modal.Body>
        <Modal.Footer>
        <Button auto flat color="error" onClick={() => deletePayment()} >
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

export default DeletePayment;
