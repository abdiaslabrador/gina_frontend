import React, {Fragment, useState, useContext, useEffect} from "react";
import { Modal, Loading } from "@nextui-org/react";
import selectBillCss from "./SelectBill.module.css";
import { billContext } from "../../../../context/register_box/bill/billContext";
import BillProducts from "./BillProducts";
import BillPayments from "./BillPayments";
import moment from "moment";

const SelectBill = () => {
  const [ subtotal, setSubtotal ] = useState<number>(0);
  const [ priceRef, setPriceRef ] = useState<number>(0);
  const [ productCant, setProductCant ] = useState<number>(0);
  const [ visible, setVisible ] = useState(false);

  const { 
    loadingBillList,
    selectedBill,
   } = useContext(billContext);

  const handler = async () => { 
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
  };

   return (
    <Fragment>
      
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
        disabled={loadingBillList || !selectedBill.id ? true : false}
      >
        Seleccionar
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
            <h3 className={selectBillCss["title"]}>Datos de la factura</h3>
        </Modal.Header>
        <Modal.Body>
          <div className={selectBillCss["client_side"]}>
            <div>Documento: {selectedBill.docu?.id}</div> 
            <div>Cliente: {selectedBill.docu?.client?.name} {selectedBill.docu?.client?.last_name}</div>
            <div>Ci: {selectedBill.docu?.client?.ci_rif}</div>
            <div>Dir: {selectedBill.docu?.client?.direction}</div>
            <div className={selectBillCss["client_side__bill_title"]}> FACTURA</div>
            <div className={selectBillCss["client_side__bill_number"]}>
                <div>FACTURA:</div>
                <div>{selectedBill.id}</div>
            </div>
            <div className={selectBillCss["client_side__bill_number"]}>
                <div>FECHA: {moment(selectedBill?.docu?.document_date).format("DD-MM-YYYY")}</div>
                <div>HORA: {moment(selectedBill?.docu?.document_date).format("HH:mm")}</div>
            </div>
            <div className={selectBillCss["client_side__bill_number"]}>
                <div>TASA:</div>
                <div>{selectedBill.docu?.currency_day_value}</div>
            </div>
          </div>
          <BillProducts/>
          <div className={selectBillCss["total_side"]}>
            <div>Sub-total: {selectedBill.docu?.subtotal}</div> 
            <div>Descuento: ({selectedBill.docu?.discount}%) {(Number(((selectedBill.docu?.discount * selectedBill.docu?.subtotal)/100).toFixed(2)))}</div>
            <div>Total: {selectedBill.docu?.total}</div>
            <div>Total pagado: {selectedBill.docu?.total_payed}</div>
            <div>Cambio: {selectedBill.docu?.change}</div>
          </div>
          <BillPayments/>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default SelectBill;