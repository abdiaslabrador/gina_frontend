import React, {useContext} from "react";
import { Modal, Button } from "@nextui-org/react";
import { Loading } from "@nextui-org/react";
import { billContext } from "../../../context/register_box/bill/billContext";

const CancelBill = () => {
  const { selectedBill, loadingBillCancel, cancelBillFn } = useContext(billContext);
  const [visible, setVisible] = React.useState(false);
  const [mensaje, setMensaje] = React.useState(
    "¿Estas seguro de anular la factura?"
  );
  
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const cancelBill = async () => {
      await cancelBillFn(selectedBill.id)
      setVisible(false);
  };

  return (
    <div>
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
        disabled={selectedBill.id ? false : true}
      >
        Anular
      </button>

      <Modal
        closeButton={!loadingBillCancel}
        preventClose
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        {/* <Modal.Header>
            
        </Modal.Header> */}
        <Modal.Body>
          {loadingBillCancel ?
            ( <Loading /> )
            : 
            (<div>{mensaje}</div>)
          }
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={() => cancelBill()} disabled={loadingBillCancel}>
              Si
            </Button>
            <Button auto onClick={closeHandler} disabled={loadingBillCancel}>
              No
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CancelBill;
