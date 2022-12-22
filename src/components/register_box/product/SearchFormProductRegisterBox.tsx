import React, {Fragment, useContext, } from "react";
import searchFormProductCss from './SearchFormProductRegisterBox.module.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { productContext } from "../../../context/register_box/product/productContext";
import  customAxios  from "../../../config/axios";
import { ProductInf } from "../../../interface/productInf";

const SearchFormProduct = () => {
  const { selectOption, searchProductByFn, setSelectOptionFn, setSelectedProductFn } = useContext(productContext);

  const initialValues={
      searchOptions: '',
      description: '',
      lessThan: 0,
      code: '',
  }


  const formHandler = async  (values: any) => {
    setSelectedProductFn({} as ProductInf); //limpia la selección
    let selectValue : string | number;
    if(selectOption == "description" || selectOption == "code"){
      selectValue = (values[selectOption]).toLowerCase().trim();
    }else{
      selectValue = values.lessThan;
    }
    await searchProductByFn(selectValue);
    
  }

  function validateDescription(value: any) {
    let error;

    if (!value.trim()) {
      error = "Campo requerido";
    }
    return error;
  }

  function validatLessThan(value: any) {
    let error;
    if (value === '') {
      error = "Campo requerido";
    }
    return error;
  }

  async function validateCode(value: any) {
    let error;

    if (!value.trim()) {
      return error = "Campo requerido";
    }
    try {
      const resp = await customAxios.post("product/searchby", {
        selectValue: value.trim(),
        selectOption: "code"
      });
      (resp.data.length == 0) ? error = "No se encuentra el producto" : null;

    } catch (errorPetition: any) {
        error = errorPetition.response.data?.msg || errorPetition.message;
    }

    return error;
  }

  const busquedaHandler = (e: any, resetForm : any) => {
    setSelectOptionFn(e.target.value );
    resetForm({values: ''})
  };

return (
    <div className={searchFormProductCss["container"]}>
      <div className={searchFormProductCss["search"]}>
        {<Formik
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={formHandler}
          >
          {({ values , resetForm}) => (
          <Form>
            <Fragment>
                <div className={searchFormProductCss["form_select"]}>
                    <select 
                      name="searchOptions"
                      value={selectOption}
                      onChange={(e)=>busquedaHandler(e, resetForm)}
                    >
                        <option value=""> -- Seleccione un opción -- </option>
                        <option value="all">Todos</option>
                        <option value="description">Descripción</option>
                        <option value="lessThan">Menor que</option>
                        <option value="code">Código</option>
                    </select>
                </div>
                 <div className={searchFormProductCss["form_group"]}>
                  {(selectOption == "description")?
                    (<Fragment>
                      <Field
                        validate={validateDescription}
                        className={searchFormProductCss["square__form"]}
                        type="text"
                        name="description"
                        placeholder="Decripción"
                      />
                      <ErrorMessage
                        className={searchFormProductCss["square__form-error"]}
                        component="div"
                        name="description"
                      />
                    </Fragment>)
                    :
                      (null)
                  }
                  

                  {(selectOption == "lessThan")?
                  (<Fragment>
                    <Field
                      validate={validatLessThan}
                      className={searchFormProductCss["square__form"]}
                      type="number"
                      name="lessThan"
                      placeholder="Escriba el rango"
                      min="0"
                    />
                    <ErrorMessage
                      className={searchFormProductCss["square__form-error"]}
                      component="div"
                      name="lessThan"
                    />
                  </Fragment>)
                  :
                    null
                  }

                  {(selectOption == "code")?
                  (<Fragment>
                    <Field
                      validate={validateCode}
                      className={searchFormProductCss["square__form"]}
                      type="text"
                      name="code"
                      placeholder="Escriba el código"
                    />
                    <ErrorMessage
                      className={searchFormProductCss["square__form-error"]}
                      component="div"
                      name="code"
                    />
                  </Fragment>)
                  :
                    null
                  }

                  {(selectOption)?
                    <button
                        type="submit"
                        className="button_form__button button_form__button--efect"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  :
                    null
                  }  
                  </div>        
                </Fragment>
          </Form>
        )}
        </Formik> 
        }
        </div>
    </div>
  );
};

export default SearchFormProduct;