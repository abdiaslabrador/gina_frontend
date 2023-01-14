import React, {Fragment, useContext, } from "react";
import searchPatientCss from './SearchFormPatient.module.css'
import { Formik, Form, Field,  ErrorMessage } from "formik";
import  customAxios  from "../../../../config/axios";
import { patientManagerContext } from "../../../../context/odontology/patientManager/patientManagerContext";
import { PatientInf } from "../../../../interface/odontology/patientInf";
import moment from "moment";

const SearchFormPatient = () => {
  const { 
          selectOption, 
          searchPatientByCiFn,
          searchPatientByDateFn,
          searchPatientByNamesFn,
          setSelectOptionFn,
          setSelectedPatientFn
         } = useContext(patientManagerContext);

  const today_date : string = moment( new Date()).format("YYYY-MM-DD")
  const initialDateValues={
      birthday: "",
  }

  const nameInfoInitialValues={
    name: "",
    last_name:"",
  }

  const formDateHandler = async  (values: any) => {
    setSelectedPatientFn({} as PatientInf);
    await searchPatientByDateFn(values.birthday);
  }

  const formCiHandler = async  (values: any) => {
    setSelectedPatientFn({} as PatientInf);
    searchPatientByCiFn(values.ci_rif);
  }

  const formNamesHandler = async  (values: any) => {
    setSelectedPatientFn({} as PatientInf);
    const name = values.name.toLowerCase().trim();
    const last_name = values.last_name.toLowerCase().trim();
    searchPatientByNamesFn(name, last_name);
  }

  async function validateCi(value: any) {
    let error;

    if (!value) {
      return error = "Campo requerido";
    }
    try {
      const resp = await customAxios.post("/patient/getbyci", {
        ci_rif : value
      });

    } catch (errorPetition: any) {
        error = errorPetition.response.data?.msg || errorPetition.message;
    }

    return error;
  }

  function validateDate(value : any, values: any){
    let error;
    if (!value) {
      error = "Campo requerido";
    }
    return error;
  }

  function validateName(value : any, values: any){
    let error;
    if (!value.toLowerCase().trim()) {
      error = "Campo requerido";
    }
    return error;
  }

  function validateLastName(value : any, values: any){
    let error;
    if (!value.toLowerCase().trim()) {
      error = "Campo requerido";
    }
    return error;
  }

  const busquedaHandler = (e: any) => {
    setSelectOptionFn( e.target.value );
  };

return (
    <div className={searchPatientCss["container"]}>
      <div className={searchPatientCss["form_select"]}>
            <select 
              name="searchOptions"
              value={selectOption}
              onChange={(e)=>busquedaHandler(e)}
            >
                <option value="ci_rif">Ci</option>
                <option value="birthday">Fecha</option>
                <option value="name_info">Nombre y apellido</option>
            </select>
        </div>

        {(selectOption == "birthday")?
                  (
                    <Formik
                        initialValues={initialDateValues}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={formDateHandler}
                      >
                    {({ values , resetForm}) => (
                    <Form>
                      <div className={searchPatientCss["form_group"]}>
                      <Field
                        validate={validateDate}
                        className={searchPatientCss["form"]}
                        type="date"
                        max={today_date}
                        name="birthday"
                      />
                      <ErrorMessage
                        className={`${searchPatientCss["form_error"]} ${searchPatientCss["form_error--form_group"]}`}
                        component="div"
                        name="birthday"
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

                  {(selectOption == "ci_rif")?
                  (
                    <Formik
                        initialValues={{ci_rif: ''}}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={formCiHandler}

                      >
                    <Form>
                      <div className={searchPatientCss["form_group"]}>
                        <Field
                          validate={validateCi}
                          className={searchPatientCss["form"]}
                          type="number"
                          min="1"
                          name="ci_rif"
                          placeholder="Escriba la ci"
                        />
                        <ErrorMessage
                          className={`${searchPatientCss["form_error"]} ${searchPatientCss["form_error--form_group"]}`}
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
                  )
                  :
                    null
                  }

                {(selectOption == "name_info")?
                  (
                    <Formik
                        initialValues={nameInfoInitialValues}
                        validateOnChange={false}
                        validateOnBlur={false}
                        onSubmit={formNamesHandler}
                      >
                    <Form>
                      <div className={searchPatientCss["form_names"]}>
                      
                      <div className={searchPatientCss["form_margin"]}>
                        <Field
                          validate={validateName}
                          className={searchPatientCss["form"]}
                          type="text"
                          name="name"
                          placeholder="Escriba nombre"
                        />
                        <ErrorMessage
                          className={`${searchPatientCss["form_error"]} ${searchPatientCss["form_error--form_group"]}`}
                          component="div"
                          name="name"
                        />
                      </div>
                      <div className={searchPatientCss["form_margin"]}>
                        <Field
                          validate={validateLastName}
                          className={searchPatientCss["form"]}
                          type="text"
                          name="last_name"
                          placeholder="Escriba apellido"
                        />
                        <ErrorMessage
                          className={`${searchPatientCss["form_error"]} ${searchPatientCss["form_error--form_group"]}`}
                          component="div"
                          name="last_name"
                        />
                          
                        </div>
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

export default SearchFormPatient;