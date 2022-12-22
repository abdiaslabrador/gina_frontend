import React, { Fragment, useContext } from "react";
import { Modal, Button } from "@nextui-org/react";
import { Loading } from "@nextui-org/react";
import { registerBoxContext } from "../../../context/register_box/register_box/registerBoxContext";
import cajaCss from "../register_box/Caja.module.css";


const CancelPurchase = () => {
  const [visible, setVisible] = React.useState(false);
  // const [mensaje, setMensaje] = React.useState(
  //   "¿Estas seguro de cancelar la compra?"
  // );
  const { client, cancelThePurchaseFn } = useContext( registerBoxContext );
  
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const cancelPurchase = async () => {
      cancelThePurchaseFn();
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
