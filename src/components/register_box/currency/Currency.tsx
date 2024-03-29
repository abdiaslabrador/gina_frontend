import React, {Fragment, useState, useContext, useEffect} from "react";
import { Modal, Loading } from "@nextui-org/react";
import currencyCss from "./Currency.module.css";
import cajaCss from "../register_box/Caja.module.css";
import customAxios from "../../../config/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { currencyContext } from "../../../context/register_box/currency/currencyContext";
import comunModalCss from "../../../styles/modal.module.css";

interface initialValues {
  id: number,
  today_currency: number;
}
const Currency = () => {
  const { currency, msjSuccess, msjError, loadingForm, loadingCurrency, updateCurrencyFn } = useContext(currencyContext);
  const [visible, setVisible] = React.useState(false);
  
  const handler = async () => { 
    setVisible(true);
  }

  const closeHandler = () => {
    setVisible(false);
  };

  const formHandler = async (values: any) => {
        await updateCurrencyFn(values);
  };

  function validateTasa(value: any) {
    let error;
    if (value === "") {
      error = "Campo requerido";
    }
    // if(!/^[0-9]+([.][0-9]{1,2})?$/i.test(value)){
    //   error = "Tasa mal escrita";
    // }
      
    return error;
  }

  return (
    <Fragment>
      <div 
      className={ `${cajaCss["options__items"]} ${(cajaCss["options__items--enable"]) } `}
      onClick={handler}
      >
        <i className="fa-solid fa-gears"></i>
      </div>

      <Modal
        animated={false}
        width="600px"
        css={{ height: "600px", backgroundColor: "#302F2F" }}
        closeButton={!loadingForm}
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
            <h3 className={currencyCss["title"]}>Divisas</h3>
        </Modal.Header>
        <Modal.Body>
          {(!loadingCurrency && currency) ? (
          <div className={comunModalCss["body_container"]}>
            {
              <Formik
                initialValues={currency}
                onSubmit={formHandler}
              >
                {({ values }) => (
                  <Form>
                    <div className={comunModalCss["form_group"]}>
                      <div className={`${comunModalCss["form_group__label"]} ${currencyCss["capitalize-label"]}`}>
                        <label>{currency.name}</label>
                      </div>
                      <Field
                        validate={validateTasa}
                        type="number"
                        min="0.01"
                        step="0.01"
                        name="today_currency"
                        placeholder="Ejm: 11.5 o 11"
                        disabled={loadingForm}
                      />
                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="today_currency"
                      />
                    </div>

                                        
                    <div className={comunModalCss["button_group"]}>
                    {loadingForm ? (
                      <div className="button_form__button">
                        <Loading
                          type="spinner"
                          color="currentColor"
                          size="sm"
                        />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="button_form__button button_form__button--efect"
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
          null}
        </Modal.Body>
        <Modal.Footer>
           <div className={comunModalCss["footer_container"]}>
            {( msjSuccess )?(<div className={comunModalCss["msj_success"]}>{msjSuccess}</div>): null}
            {( msjError )?(<div className={comunModalCss["msj_error"]}>{msjError}</div>):null}
           </div>
        </Modal.Footer>
        
      </Modal>
    </Fragment>
  );
};

export default Currency;
