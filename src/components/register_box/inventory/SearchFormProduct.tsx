import React, {Fragment, useContext, useEffect, useState} from "react";
import searchFormProductCss from './SearchFormProduct.module.css'
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { productContext } from "../../../context/register_box/product/productContext";
import  customAxios  from "../../../config/axios";
import * as Yup from "yup";
import { Divider } from "@nextui-org/react";

const SearchFormProduct = () => {
  const { productList, searchProductByCodeFn, searchProductByDescriptionFn, searchProductByCantFn } = useContext(productContext);
  const [ showEmployeeSystem, setshowEmployeeSystem ] = useState(false);
  const router = useRouter();

  const [visible, setVisible] = React.useState(false);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

const initialValues={
    searchOptions: '',
    description: '',
    lessThan: 0,
    code: '',
    
}


const formHandler = async  (values : any) =>{
  if(values.searchOptions == "description"){
    await searchProductByDescriptionFn(values.description.toLowerCase().trim())
    console.log(productList)

  }
  else if(values.searchOptions == "lessThan"){
    await searchProductByCantFn(values.lessThan)
    console.log(productList)

  }
  else if(values.searchOptions == "code"){
    await searchProductByCodeFn(values.code.toLowerCase().trim())
    console.log(productList)

  }
  
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
  console.log(value)
  if (value === '' || value < 0) {
    error = "Campo requerido";
  }
  return error;
}

async function validateCode(value: any) {
  let error;

  if (!value.trim()) {
    error = "Campo requerido";
  }
  try {
    const resp = await customAxios.post("product/getbycode", {
      code: value.trim(),
    });
    
  } catch (errorPetition: any) {
      error = errorPetition.response.data?.msg || errorPetition.message;
  }

  return error;
}

return (
    <div className={searchFormProductCss["container"]}>

           
        { <Formik
            initialValues={initialValues}
            
            onSubmit={formHandler}
            validateOnChange={false}
            validateOnBlur={false}
          >
          {({ values }) => (
          <Form>
                <div className={searchFormProductCss["form_select"]}>
                    <Field as="select" name="searchOptions" >
                      <option value=""> -- Seleccione un opción -- </option>
                      <option value="description">Descripción</option>
                      <option value="lessThan">Menor que</option>
                      <option value="code">Código</option>
                    </Field>
                </div>

                 <div className={searchFormProductCss["form_group"]}>
                  {(values.searchOptions == "description")?
                    (<Fragment>
                      {values.code =""}
                      {values.lessThan =0}
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
                  

                  {(values.searchOptions == "lessThan")?
                  (<Fragment>
                    {values.description =""}
                    {values.code =""}
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

                  {(values.searchOptions == "code")?
                  (<Fragment>
                    {values.description =""}
                    {values.lessThan =0}
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

                  {
                  (values.searchOptions)?
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
        </Form>
        )}
        </Formik> 
        }
    </div>
  );
};

export default SearchFormProduct;