import React, {useContext} from "react";
import { Modal, Button } from "@nextui-org/react";
import customAxios from "../../../config/axios";
import { Loading } from "@nextui-org/react";
import { inventoryContext } from "../../../context/register_box/inventory/inventoryContext";

const UpdatePricesWithCurrency = () => {
  const { loadingProductPrices, updateProductPricesFn } = useContext(inventoryContext);

  const [visible, setVisible] = React.useState(false);
  const [mensaje, setMensaje] = React.useState(
    "¿Estas seguro de actualizar el precio de los productos?"
  );
  
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const updatePricesWithTheCurrency = async () => {
      await updateProductPricesFn()
      setVisible(false);
  };

  return (
    <div>
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
      >
        <i className="fa-solid fa-rotate-right"></i>
      </button>

      <Modal
        closeButton={!loadingProductPrices}
        preventClose
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        {/* <Modal.Header>
            
        </Modal.Header> */}
        <Modal.Body>
          {(loadingProductPrices) ? ( <Loading /> ) : (<div>{mensaje}</div>)}
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={() => updatePricesWithTheCurrency()} disabled={loadingProductPrices}>
              Si
            </Button>

            <Button auto onClick={closeHandler} disabled={loadingProductPrices}>
              No
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdatePricesWithCurrency;
