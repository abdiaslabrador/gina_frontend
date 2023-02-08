import React, {Fragment, useContext} from "react";
import { Modal, } from "@nextui-org/react";
import cajaCss from "../register_box/Caja.module.css";
import billManagerCss from "./BillManager.module.css";
import comunModalCss from "../../../styles/modal.module.css";
import SearchFormBillManager from "./SearchFormBillManager";
import BillManagerTable from "./BillManagerTable";
import { billContext } from "../../../context/register_box/bill/billContext";


const BillManager = () => {
  const [ visible, setVisible ] = React.useState(false);
  const { cleanBillFn, msjSuccessBill, msjErrorBill, } = useContext(billContext);
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
        className={ `${cajaCss["options__items"]} ${(cajaCss["options__items--enable"]) } `}
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
        <Modal.Footer>
            <div className={comunModalCss["footer_container"]}>
            {( msjSuccessBill )?(<div className={comunModalCss["msj_success"]}>{msjSuccessBill}</div>): null}
            {( msjErrorBill )?(<div className={comunModalCss["msj_error"]}>{msjErrorBill}</div>):null}
           </div>
        </Modal.Footer>

      </Modal>
    </Fragment>
  );
};

export default BillManager;