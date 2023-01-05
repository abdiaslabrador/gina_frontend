import React, {Fragment, useContext, } from "react";
import searchBillCss from './SearchFormBillManager.module.css'
import { Formik, Form, Field,  ErrorMessage } from "formik";
import  customAxios  from "../../../config/axios";
import { billContext } from "../../../context/register_box/bill/billContext";
import moment from "moment";
import { today } from "@internationalized/date";

const SearchFormBillManager = () => {
  const { selectOption, 
        //   searchBillByFn,
          setSelectOptionFn,
        //   setSelectedProductFn
         } = useContext(billContext);

  const today_date : string = moment( new Date()).format("YYYY-MM-DD")
  const initialDateValues={
      since_date: today_date,
      until_date: today_date
  }


  const formHandler = async  (values: any) => {
    // setSelectedProductFn({} as ProductInf); //limpia la selección
    // let selectValue : string;
    // if(selectOption == "code"){
    //   selectValue = (values[selectOption]).toLowerCase().trim();
    // }else{
    //   selectValue = values.bill_date;
    // }
    // await searchBillByFn(selectValue);
    console.log("Buscando factura...")
    
  }



  async function validateCode(value: any) {
    let error;

    if (!value) {
      return error = "Campo requerido";
    }
    // try {
    //   const resp = await customAxios.post("product/searchby", {
    //     selectValue: value.trim(),
    //     selectOption: "code"
    //   });
    //   (resp.data.length == 0) ? error = "No se encuentra el producto" : null;

    // } catch (errorPetition: any) {
    //     error = errorPetition.response.data?.msg || errorPetition.message;
    // }

    return error;
  }

  function validateDate(value : any, values: any){
    let error;
    if (!value) {
      return error = "Campo requerido";
    }
    if (value > values.until_date) {
      return error = "'Desde' tiene que ser menor que 'hasta'";
    }
    return error;
  }

  const busquedaHandler = (e: any) => {
    setSelectOptionFn( e.target.value );
  };

return (
    <div className={searchBillCss["container"]}>
      <div className={searchBillCss["form_select"]}>
            <select 
              name="searchOptions"
              value={selectOption}
              onChange={(e)=>busquedaHandler(e)}
            >
                <option value=""> -- Seleccione un opción -- </option>
                <option value="bill_date">Fecha</option>
                <option value="code">Código</option>
            </select>
        </div>

        {(selectOption == "bill_date")?
                  (
                    <Formik
                        initialValues={initialDateValues}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={formHandler}
                      >
                    {({ values , resetForm}) => (
                    <Form>
                      <div className={searchBillCss["date_group"]}>
                      
                      <label className={searchBillCss["form_label"]}>
                         Desde: 
                      </label>
                      <Field
                        validate={(value: any) =>
                          validateDate(value, values)
                        }
                        className={searchBillCss["form"]}
                        type="date"
                        max={today_date}
                        name="since_date"
                      />
                      <ErrorMessage
                        className={`${searchBillCss["form_error"]} ${searchBillCss["form_error--date_since"]}`}
                        component="div"
                        name="since_date"
                      />

                      
                      <label className={searchBillCss["form_label"]}>
                         Hasta: 
                      </label>
                      <Field
                        className={searchBillCss["form"]}
                        type="date"
                        max={today_date}
                        name="until_date"
                      />
                     
                      <ErrorMessage
                        className={`${searchBillCss["form_error"]} ${searchBillCss["form_error--date_until"]}`}
                        component="div"
                        name="until_date"
                      />
                        <button
                            type="submit"
                            className="button_form__button button_form__button--efect"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </div>
                    </Form>
                    )}
                    </Formik>
                  )
                  :
                    null
                  }

                  {(selectOption == "code")?
                  (
                    <Formik
                        initialValues={{code: ''}}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={formHandler}
                      >
                    <Form>
                      <div className={searchBillCss["form_group"]}>
                        <Field
                          validate={validateCode}
                          className={searchBillCss["form"]}
                          type="number"
                          min="1"
                          name="code"
                          placeholder="Escriba el número"
                        />
                        <ErrorMessage
                          className={`${searchBillCss["form_error"]} ${searchBillCss["form_error--form_group"]}`}
                          component="div"
                          name="code"
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
                  )
                  :
                    null
                  }
    </div>
  );
};

export default SearchFormBillManager;