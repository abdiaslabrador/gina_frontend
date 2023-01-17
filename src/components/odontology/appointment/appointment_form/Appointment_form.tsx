import React, {Fragment, useContext, useEffect, useState} from "react";
import { useRouter } from "next/router";
import appointmentCss from './Appointment_form.module.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Modal, Loading } from "@nextui-org/react";
import { patientContext } from "../../../../context/odontology/patient/patientContext";
import comunModalCss from "../../../../styles/modal.module.css";
import moment from "moment";
import { appointmentContext } from "../../../../context/odontology/work_table/appointment/appointmentContext";

const Appointment_form = () => {
  const router = useRouter();
  const {loadingFormAppointment, createAppointmentFn} = useContext(appointmentContext);
  const {patient} = useContext(patientContext);
  const today_date =moment(new Date()).format("YYYY-MM-DD")
  const initialValues = {
    today_date: today_date,
    reason: "",
    description: "",
  }

  async function formHandler(values : any){
    const appointment = {
      today_date: values.today_date,
      reason: values.reason,
      description: values.description,
    }
    await createAppointmentFn(appointment);
  }

  return (
    <Fragment>
    {(patient)?
      
          <Fragment>
          {
              <Formik
                initialValues={initialValues}
                onSubmit={formHandler}
                validateOnChange={false}
                validateOnBlur={false}
              >
                <Form>
                <div className={comunModalCss["form_group"]} >
                    <div className={comunModalCss["form_group__label"]}>
                      <label>Fecha de nacimiento*:</label>
                    </div>

                    <Field
                      // validate={validateBirthday}
                      type="date"
                      name="today_date"
                      max={today_date}
                      placeholder="Escriba el teléfono"
                      disabled={loadingFormAppointment}
                    />
                    <ErrorMessage
                      className={comunModalCss["square__form-error"]}
                      component="div"
                      name="today_date"
                    />
                  </div>

                  <div className={comunModalCss["form_group"]}>
                    <div className={comunModalCss["form_group__label"]}>
                      <div>Motivo:</div>
                    </div>
                      <Field
                        as="textarea"
                        type="text"
                        name="reason"
                        placeholder="Escriba el motivo"
                        style={{ resize: "none" }}
                        rows={3}
                        cols={23}
                        disabled={loadingFormAppointment}
                      />
                  </div>

                  <div className={comunModalCss["form_group"]}>
                      <div className={comunModalCss["form_group__label"]}>
                        <div>Descripción:</div>
                      </div>
                        <Field
                          as="textarea"
                          type="text"
                          name="description"
                          placeholder="Escriba el antecedente"
                          style={{ resize: "none" }}
                          rows={5}
                          cols={23}
                          disabled={loadingFormAppointment}
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