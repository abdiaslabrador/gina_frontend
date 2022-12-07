import React, {Fragment, useState, useContext, useEffect} from "react";
import { Modal, Loading } from "@nextui-org/react";
import inventoryCss from "./Inventory.module.css";
import cajaCss from "../../../styles/Caja.module.css";
import customAxios from "../../../config/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { currencyContext } from "../../../context/register_box/currency/currencyContext";

interface initialValues {
  id: number,
  today_currency: number;
}
const Inventory = () => {
//   const { currency, msjSuccess, msjError, loadingForm, loadingCurrency,  getCurrencyFn, updateCurrencyFn } = useContext(currencyContext);
  const [visible, setVisible] = React.useState(false);
  
  const handler = async () => { 
    setVisible(true);
  }

  const closeHandler = () => {
    setVisible(false);
  };

//   const formHandler = async (values: any) => {
//         await updateCurrencyFn(values);
//   };

//   async function validateTasa(value: string) {
//     let error;
//     console.log(value)
//     if (!value) {
//       error = "Campo requerido";
//     }
//     if(!/^[0-9]+([.][0-9]{1,2})?$/i.test(value)){
//       error = "Tasa mal escrita";
//     }
      
//     return error;
//   }

  return (
    <Fragment>
      <div 
        className={cajaCss["options__items"]}
        onClick={handler}
      >
        <i className="fa-solid fa-boxes-stacked"></i>
      </div>

      <Modal
        animated={false}
        width="600px"
        css={{ height: "600px", backgroundColor: "#302F2F" }}
        // closeButton={!loadingForm}
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
            from inventory
          {/* {(!loadingCurrency && currency) ? (
          <div className={currencyCss["body_container"]}>
            {
              <Formik
                initialValues={currency}
                onSubmit={formHandler}
              >
                {({ values }) => (
                  <Form>
                    <div className={currencyCss["form_group"]}>
                      <div className={currencyCss["form_group__label"]}>
                        <label>{currency.name}</label>
                      </div>
                      
                      <Field
                        validate={validateTasa}
                        type="text"
                        name="today_currency"
                        placeholder="Ejm: 11.5 o 11"
                        disabled={loadingForm}
                      />

                      <ErrorMessage
                        className={currencyCss["square__form-error"]}
                        component="div"
                        name="today_currency"
                      />
                    </div>

                                        
                    <div className={currencyCss["button_group"]}>
                    {loadingForm ? (
                      <div className={currencyCss["button_form__button"]}>
                        <Loading
                          type="spinner"
                          color="currentColor"
                          size="sm"
                        />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className={`${currencyCss["button_form__button"]} ${currencyCss["button_form__button--efect"]}`}
                      >
                        Actualizar
                      </button>
                    )}
                  </div>
                  </Form>
                )}
              </Formik>
            }
          </div>):
          null
          }
          {(loadingCurrency && !currency)?(
            <Loading
                type="spinner"
                color="white"
                size="xl"
            />            
          ):
          null}
          {(!loadingCurrency && !currency)?(
            <h1 className={currencyCss["title"]}>No hay tipo de divisas</h1>      
          ):
          null} */}
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
