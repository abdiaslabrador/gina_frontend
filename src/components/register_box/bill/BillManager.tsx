import React, {Fragment, useContext} from "react";
import { Modal, } from "@nextui-org/react";
import cajaCss from "../register_box/Caja.module.css";
import billManagerCss from "./BillManager.module.css";
import customAxios from "../../../config/axios";
import SearchFormBillManager from "./SearchFormBillManager";
import BillManagerTable from "./BillManagerTable";
import { billContext } from "../../../context/register_box/bill/billContext";



const BillManager = () => {
  const [ visible, setVisible ] = React.useState(false);
  const { cleanBillFn } = useContext(billContext);
  const handler = async () => { 
    setVisible(true);
  }

  const closeHandler = () => {
    cleanBillFn();
    setVisible(false);
  };

  return (
    <Fragment>
      <button 
        className={cajaCss["options__items"]}
        onClick={handler}
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
            <SearchFormBillManager/>
            <BillManagerTable/>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default BillManager;
