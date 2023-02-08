import React, {Fragment, useContext, useEffect, useState} from "react";
import { useFormikContext, Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, Loading } from "@nextui-org/react";
import appoiment_formCss from "./Appointment_form.module.css"
import { patientContext } from "../../../../context/odontology/patient/patientContext";
import comunModalCss from "../../../../styles/modal.module.css";
import moment from "moment";
import { appointmentContext } from "../../../../context/odontology/work_table/appointment/appointmentContext";

const AutoReset = () => {
  const {  resetForm } = useFormikContext();
  const {patient} = useContext(patientContext);
  useEffect(() => {
    resetForm();
  }, [patient]);
  return null;

};

const Appointment_form = () => {
  const {loadingFormAppointment, createAppointmentFn} = useContext(appointmentContext);
  const {patient} = useContext(patientContext);
  const today_date = moment(new Date()).format("YYYY-MM-DD")
  const initialValues = {
    today_date: today_date,
    reason: "",
    description: "",
  }
  
  async function formHandler(values: any, resetForm: any){
    
    const appointment = {
      today_date: values.today_date,
      reason: values.reason,
      description: values.description,
    }
    await createAppointmentFn(appointment);
    resetForm();
  }

  function validateDate(value: any){
    let error;
  
      if (!value) {
        error = "Campo requerido";
      }
      return error;
   }

   function validateTextareas(value: any){
    let error;
      if (!value.trim()) {
        error = "Campo requerido";
      }
      return error;
   }

  return (
    <Fragment>
    {(patient)?
      
          <Fragment>
          {
              <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) =>
                formHandler(values, resetForm)
              }
                validateOnChange={false}
                validateOnBlur={false}
              >
                <Form>
                <AutoReset/>
                <div className={appoiment_formCss["form_group"]}>
                  <div className={comunModalCss["form_group__label"]}>Fecha de consulta*:</div >
                    <Field
                      style={{color: "black"}}
                      validate={validateDate}
                      type="date"
                      name="today_date"
                      disabled={loadingFormAppointment}
                    />
                    <ErrorMessage
                      className={comunModalCss["square__form-error"]}
                      component="div"
                      name="today_date"
                      />
                  </div>

                    <div style={{color: "white"}}>Motivo*:</div>
                    <div className={appoiment_formCss["textarea_input"]}>
                      <Field
                        validate={validateTextareas}
                        as="textarea"
                        type="text"
                        name="reason"
                        placeholder="Escriba el motivo de la consulta"
                        style={{ resize: "none" }}
                        rows={1}
                        cols={150}
                        disabled={loadingFormAppointment}
                      />
                      <ErrorMessage
                        className={comunModalCss["square__form-error"]}
                        component="div"
                        name="reason"
                      />
                      </div>

                      <div style={{color: "white"}}>Descripción*:</div>
                      <div className={appoiment_formCss["textarea_input"]}>
                        <Field
                          validate={validateTextareas}
                          as="textarea"
                          type="text"
                          name="description"
                          placeholder="Escriba el descripción de la consulta"
                          style={{ resize: "none" }}
                          rows={3}
                          cols={150}
                          disabled={loadingFormAppointment}
                        />
                        <ErrorMessage
                          className={comunModalCss["square__form-error"]}
                          component="div"
                          name="description"
                        />
                        </div>
                      <div className={comunModalCss["button_group"]}>
                      <button
                          type="submit"
                          className="button_form__button button_form__button--efect"
                        >
                        {
                        (!loadingFormAppointment) ? <span>Guardar</span>  : 
                        (<Loading
                          type="spinner"
                          color="currentColor"
                          size="sm"
                        />)}
                      </button>
                      </div>

                </Form>
                </Formik>
            }
          </Fragment>
          :
            null
    }
    </Fragment>
      
  );
};

export default Appointment_form;


