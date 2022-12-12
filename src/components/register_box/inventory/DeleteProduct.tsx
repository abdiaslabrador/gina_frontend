import React, {useContext} from "react";
import { Modal, Button } from "@nextui-org/react";
import { ProductInf } from "../../../interface/productInf";
import customAxios from "../../../config/axios";
import { Loading } from "@nextui-org/react";
import { productContext } from "../../../context/register_box/product/productContext";

const DeleteProduct = () => {
  const { loadingForm, selectedProduct, deleteProductFn } = useContext(productContext);
  const [visible, setVisible] = React.useState(false);
  const [mensaje, setMensaje] = React.useState(
    "¿Estas seguro de eliminar el producto?"
  );
  
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const eliminarProduct = async () => {
      await deleteProductFn(selectedProduct.id)
      setVisible(false);
  };

  return (
    <div>
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
        disabled={selectedProduct.id ? false : true}
      >
        Eliminar
      </button>

      <Modal
        closeButton={!loadingForm}
        preventClose
        animated={false}
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        {/* <Modal.Header>
            
        </Modal.Header> */}
        <Modal.Body>
          {(loadingForm) ? ( <Loading /> ) : (<div>{mensaje}</div>)}
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={() => eliminarProduct()} disabled={loadingForm}>
              Si
            </Button>

            <Button auto onClick={closeHandler} disabled={loadingForm}>
              No
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteProduct;
