import React, {Fragment, useContext} from "react";
import { Modal, } from "@nextui-org/react";
import cajaCss from "../register_box/Caja.module.css";
import billManagerCss from "./BillManager.module.css";
// import productManagerCss from "./ProductManager.module.css";
import customAxios from "../../../config/axios";
// import SearchFormProductRegisterBox from "./SearchFormProductRegisterBox";
// import ProductTableRegisterBox from "./ProductTableRegisterBox";
// import { registerBoxContext } from "../../../context/register_box/register_box/registerBoxContext";
// import { productContext } from "../../../context/register_box/product/productContext";



const BillManager = () => {
//   const { client } = useContext(registerBoxContext);
//   const { cleanProductFn } = useContext(productContext);
  const [ visible, setVisible ] = React.useState(false);
  
  const handler = async () => { 
    setVisible(true);
  }

  const closeHandler = () => {
    // cleanProductFn();
    setVisible(false);
  };

  return (
    <Fragment>
      <button 
        className={cajaCss["options__items"]}
        onClick={handler}
        // disabled={ (!client) ? true  : false }
      >
        <i className="fa-solid fa-receipt"></i>
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
            <h3 className={billManagerCss["title"]}>Facturas</h3>
            
        </Modal.Header>
        <Modal.Body>
          Desde el gestor de facturas
            {/* <SearchFormProductRegisterBox/> */}
            {/* <ProductTableRegisterBox/> */}
        </Modal.Body>
        <Modal.Footer>
           {/* <div className={comunModalCss["footer_container"]}>
            {( msjSuccess )?(<div className={comunModalCss["msj_success"]}>{msjSuccess}</div>): null}
            {( msjError )?(<div className={comunModalCss["msj_error"]}>{msjError}</div>):null}
           </div> */}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default BillManager;
