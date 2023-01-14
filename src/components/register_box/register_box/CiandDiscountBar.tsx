import React, {Fragment, useContext} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import customAxios from "../../../config/axios";
import { Loading } from "@nextui-org/react";
import { registerBoxContext } from "../../../context/register_box/register_box/registerBoxContext";
import cajaCss from "./Caja.module.css";

const CiandDiscountBar = () => {
const { client, searchClientByCiRegisterBoxFn } = useContext( registerBoxContext );

    const formHandler = async  (values : any) =>{
        await searchClientByCiRegisterBoxFn(values.ci_rif);
    }

    const initialValues={
        ci_rif: ''
    }

    async function validateCi(value: any) {
        let error;

        if (!value) {
            return error = "Campo requerido";
        }

        try {
            const resp = await customAxios.post("client/getbyci", {
            ci_rif: value,
            });
            
        } catch (errorPetition: any) {
            error = errorPetition.response.data?.msg || errorPetition.message;
        }

        return error;
    }

  return (
          <div className={cajaCss["buttom_form"]}>
            {(!client)?
            <Formik
                  initialValues={initialValues}
                  onSubmit={formHandler}
                  validateOnChange={false}
                  validateOnBlur={false}
                >
              <Form>
              <div className={cajaCss["buttom_form__ci"]}>
                  <Field
                        validate={validateCi}
                        className={cajaCss["buttom_form__box"]}
                        type="number"
                        name="ci_rif"
                        min="1"
                        placeholder="Escriba la cédula"
                    />
                      <button
                          type="submit"
                          className="button_form__button button_form__button--efect"
                      >
                          <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                      <ErrorMessage
                          className={cajaCss["square__form-error"]}
                          component="div"
                          name="ci_rif"
                        />
              </div>
              </Form>
            </Formik>
            :
              <div>Cliente seleccionado</div>
            }
            </div>
 
            
  );
};

export default CiandDiscountBar;


{/* <div className={cajaCss["buttom_form__discount"]}>
              <label>Descuento: </label>
              <input className={cajaCss["buttom_form__box"]}
                disabled={ (!client || subtotal == 0)? true : false }
                type="number"
                min="0"
                max={subtotal}
                onChange={ discountOnChange }
              />
            </div> */}
