import React, {Fragment, useContext} from "react";
import { Modal, } from "@nextui-org/react";
import cajaCss from "../register_box/Caja.module.css";
import productManagerCss from "./ProductManager.module.css";
import SearchFormProductRegisterBox from "./SearchFormProductRegisterBox";
import ProductTableRegisterBox from "./ProductTableRegisterBox";
import { registerBoxContext } from "../../../context/register_box/register_box/registerBoxContext";
import { productContext } from "../../../context/register_box/product/productContext";



const ProductManager = () => {
  const { client } = useContext(registerBoxContext);
  const { cleanProductFn } = useContext(productContext);
  const [ visible, setVisible ] = React.useState(false);
  
  const handler = async () => { 
    setVisible(true);
  }

  const closeHandler = () => {
    cleanProductFn();
    setVisible(false);
  };

  return (
    <Fragment>
      <button 
        className={ `${cajaCss["options__items"]} ${ (!client) ? (cajaCss["options__items--disable"])  : (cajaCss["options__items--enable"]) } `}
        onClick={handler}
        disabled={ (!client) ? true  : false }
      >
        <i className="fa-solid fa-p"></i>
      </button>

      <Modal
        animated={false}
        width="800px"
        css={{ height: "600px", backgroundColor: "#302F2F" }}
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
            <h3 className={productManagerCss["title"]}>Búsqueda de productos</h3>
        </Modal.Header>
        <Modal.Body>
            <SearchFormProductRegisterBox/>
            <ProductTableRegisterBox/>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default ProductManager;
