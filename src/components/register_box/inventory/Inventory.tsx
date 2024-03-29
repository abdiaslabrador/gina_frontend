import React, {Fragment, useState, useContext, useEffect} from "react";
import { Modal } from "@nextui-org/react";
import inventoryCss from "./Inventory.module.css";
import cajaCss from "../register_box/Caja.module.css";
import customAxios from "../../../config/axios";
import { inventoryContext } from "../../../context/register_box/inventory/inventoryContext";
import SearchFormProduct from "./SearchFormProduct";
import ProductTable from "./ProductTable";
import { currencyContext } from "../../../context/register_box/currency/currencyContext";

const Inventory = () => {
  const { cleanInventoryFn } = useContext(inventoryContext);
  const [visible, setVisible] = React.useState(false);
  const { currency, } = useContext( currencyContext );
  
  const handler = async () => { 
    setVisible(true);
  }

  const closeHandler = () => {
    cleanInventoryFn();
    setVisible(false);
  };

  return (
    <Fragment>
      <div 
        className={ `${cajaCss["options__items"]} ${(cajaCss["options__items--enable"]) } `}
        onClick={handler}
      >
        <i className="fa-solid fa-boxes-stacked"></i>
      </div>

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
            <h3 className={inventoryCss["title"]}>Inventario</h3>
        </Modal.Header>
        <Modal.Body>
            <SearchFormProduct/>
            <ProductTable/>
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

export default Inventory;
