import React, {Fragment, useContext, } from "react";
import searchBillCss from './SearchFormBillManager.module.css'
import { Formik, Form, Field,  ErrorMessage } from "formik";
import  customAxios  from "../../../config/axios";
import { billContext } from "../../../context/register_box/bill/billContext";
import { BillInf } from "../../../interface/billInf";
import moment from "moment";

const SearchFormBillManager = () => {
  const { selectOption, 
          searchBillByIdFn,
          searchBillByDateFn,
          setSelectOptionFn,
          setSelectedBillFn
         } = useContext(billContext);

  const today_date : string = moment( new Date()).format("YYYY-MM-DD")
  const initialDateValues={
      since_date: today_date,
      until_date: today_date
  }

  const formDateHandler = async  (values: any) => {
    setSelectedBillFn({} as BillInf);
    searchBillByDateFn(values.since_date, values.until_date);
  }

  const formIdHandler = async  (values: any) => {
    setSelectedBillFn({} as BillInf);
    searchBillByIdFn(values.id);
  }

  
  async function validateCode(value: any) {
    let error;

    if (!value) {
      return error = "Campo requerido";
    }
    try {
      const resp = await customAxios.post("/document/bill/getbyid", {
        id : value
      });

    } catch (errorPetition: any) {
        error = errorPetition.response.data?.msg || errorPetition.message;
    }

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
                <option value="id">Número</option>
            </select>
        </div>

        {(selectOption == "bill_date")?
                  (
                    <Formik
                        initialValues={initialDateValues}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={formDateHandler}
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

                  {(selectOption == "id")?
                  (
                    <Formik
                        initialValues={{id: ''}}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={formIdHandler}
                      >
                    <Form>
                      <div className={searchBillCss["form_group"]}>
                        <Field
                          validate={validateCode}
                          className={searchBillCss["form"]}
                          type="number"
                          min="1"
                          name="id"
                          placeholder="Escriba el número"
                        />
                        <ErrorMessage
                          className={`${searchBillCss["form_error"]} ${searchBillCss["form_error--form_group"]}`}
                          component="div"
                          name="id"
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