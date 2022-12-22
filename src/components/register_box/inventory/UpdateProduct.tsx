import React, {Fragment, useContext} from "react";
import { Modal, Loading } from "@nextui-org/react";
import comunModalCss from "../../../styles/modal.module.css";
import customAxios from "../../../config/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { currencyContext } from "../../../context/register_box/currency/currencyContext";
import { inventoryContext } from "../../../context/register_box/inventory/inventoryContext";

const UpdateProduct = () => {
  const { currency, loadingCurrency } = useContext( currencyContext );
  const { msjSuccess, msjError, loadingForm, selectedProduct, updateProductFn } = useContext(inventoryContext);
  const [ visible, setVisible ] = React.useState(false);

  const handler = async () => { 
    setVisible(true);
  }

  const closeHandler = () => {
    setVisible(false);
  };

  const formHandler = async (values: any, resetForm: any) => {
        
        await updateProductFn(values);
  };

  function validateDescription(value: any) {
    let error;

    if (!value.trim()) {
      error = "Campo requerido";
    }
    return error;
  }

  function validatePrice(value: any) {
    let error;

    if (value === '') {
      error = "Campo requerido";
    }
    return error;
  }

  function validateCant(value: any) {
    let error;

    if (value === '') {
      error = "Campo requerido";
    }
    return error;
  }

  function validateRef(value: any) {
    let error;
  
    if (value === '') {
      error = "Campo requerido";
    }
    return error;
  }

  function price_change(values : any){
    values.price_ref=(values.price / currency.today_currency).toFixed(2);
  }

  function ref_change(values : any){
    values.price = (values.price_ref * currency.today_currency).toFixed(2);
  }

  function admit_cant_change(values : any){
    if(!values.enable_cant){
      values.cant = 0
    }
  }

  return (
    <Fragment>
      <button
        className="button_form__button button_form__button--efect"
        onClick={handler}
        disabled={selectedProduct.id ? false : true}
      >
        Editar
      </button>

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
        <Modal.Header
          css={{
            flexDirection: "column",
          }}
        >
          <div className={comunModalCss["header_container"]}>
            <div className={comunModalCss["header_title"]}>
              Actualizando un producto
            </div>
            <div className={comunModalCss["header_subtitle"]}>
              (*) Atributos requeridos
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={comunModalCss["body_container"]}>
            {
              <Formik
                initialValues={selectedProduct}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, { resetForm }) =>
                  formHandler(values, resetForm)
                }
              >
                {({ values, handleBlur }) => (
                 
                  <Form>
                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Descripción*:</label>
                      </div>
                      <Field
                        validate={validateDescription}
                        type="text"
                        name="description"
                        placeholder="Escriba descripción"
                        disabled={loadingForm || loadingCurrency}
                      />
                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="description"
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Cantidad*:</label>
                      </div>
                        <Field
                          validate={validateCant}
                          type="number"
                          name="cant"
                          min="0"
                          step="1"
                          placeholder="Cantidad del producto"
                          disabled={loadingForm || loadingCurrency || !values.enable_cant}
                        />
                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="cant"
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Precio*:</label>
                      </div>
                      <Field
                        validate={validatePrice}
                        type="number"
                        name="price"
                        min="0.01"
                        step="0.01"
                        placeholder="Precio"
                        onBlur={(e : any)=>{
                                        handleBlur(e)
                                        price_change(values)
                                      }} 
                        disabled={loadingForm || loadingCurrency}
                      />
                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="price"
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <label>Precio de referencia:</label>
                      </div>
                      <Field
                        validate={validateRef}
                        type="number"
                        name="price_ref"
                        min="0.01"
                        step="0.01"
                        onBlur={(e : any)=>{ 
                                          handleBlur(e)
                                          ref_change(values)
                                      }} 
                        placeholder="Precio de referencia"
                        disabled={loadingForm || loadingCurrency || !values.admit_update_currency}
                      />
                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="price_ref"
                      />
                    </div>

                    <div className={comunModalCss["form_group"]}>
                        <div className={comunModalCss["form_group__label"]}>
                          <label>Permitir ser actualizado:</label>
                        </div>
                        <Field
                          type="checkbox"
                          name="admit_update_currency"
                          disabled={loadingForm || loadingCurrency}
                        />
                      </div>
                    
                    <div className={comunModalCss["form_group"]}>
                        <div className={comunModalCss["form_group__label"]}>
                          <label>Requiere de cantidades:</label>
                        </div>
                        <Field
                          type="checkbox"
                          name="enable_cant"
                          disabled={loadingForm || loadingCurrency}
                          onBlur={(e : any)=>{ 
                                          handleBlur(e)
                                          admit_cant_change(values)
                                      }} 
                        />
                      </div>

                   
                    <div className={comunModalCss["button_group"]}>
                    { (loadingForm || loadingCurrency) ? (
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
          </div>
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

export default UpdateProduct;
