import React, {useContext} from "react";
import { Modal, Button } from "@nextui-org/react";
import customAxios from "../../../config/axios";
import { registerBoxContext } from "../../../context/register_box/register_box/registerBoxContext";
import cajaCss from "../register_box/Caja.module.css";

const TakeOutProduct = () => {
  const { client, selectedProductRegisterBox, takeOutProductRegisterBoxFn } = useContext(registerBoxContext);
  const [visible, setVisible] = React.useState(false);
  const [mensaje, setMensaje] = React.useState(
    "¿Estas seguro de sacar el producto?"
  );
  
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const takeOutProduct = async () => {
      await takeOutProductRegisterBoxFn(selectedProductRegisterBox.id)
      setVisible(false);
  };

  return (
    <div>
      
      <button
        className={ `${cajaCss["options__items"]} ${ (!selectedProductRegisterBox.id || !client) ? (cajaCss["options__items--disable"])  : (cajaCss["options__items--enable"]) } `}
        onClick={handler}
        disabled={!selectedProductRegisterBox.id ? true : false}
      >
        <i className="fa-brands fa-mixer"></i>
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
            <Button auto flat color="error" onClick={() => takeOutProduct()}>
              Si
            </Button>

            <Button auto onClick={closeHandler}>
              No
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TakeOutProduct;
