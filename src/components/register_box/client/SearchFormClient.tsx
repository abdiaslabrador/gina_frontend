import React, {Fragment, useContext} from "react";
import searchFormClientCss from './SearchFormClient.module.css'
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { clientContext } from "../../../context/register_box/client/clientContext";
import  customAxios  from "../../../config/axios";

const SearchFormClient = () => {
  const { searchClientByCiFn, cleanClientsFn } = useContext(clientContext);
  const router = useRouter();

  const initialValues={
      ci_rif: ''
  }

  const formHandler = async  (values : any) =>{
    await searchClientByCiFn(values.ci_rif);
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
        cleanClientsFn();
    }

    return error;
  }

  return (
      <div className={searchFormClientCss["container"]}>
          <Formik
                  initialValues={initialValues}
                  onSubmit={formHandler}
                  validateOnChange={false}
                  validateOnBlur={false}
                >
            <Form>
                  <div className={searchFormClientCss["form_group"]}>
                    <Field
                        validate={validateCi}
                        className={searchFormClientCss["square__form"]}
                        type="number"
                        name="ci_rif"
                        placeholder="Escriba la cédula"
                    />
                    <ErrorMessage
                        className={searchFormClientCss["square__form-error"]}
                        component="div"
                        name="ci_rif"
                      />
                    <button
                        type="submit"
                        className="button_form__button button_form__button--efect"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
            </Form>
          </Formik>
      </div>
    );
};

export default SearchFormClient;