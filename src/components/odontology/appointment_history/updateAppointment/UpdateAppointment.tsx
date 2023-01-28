import React, {useContext, useEffect, useState} from "react";
// import backgroundCss from './UpdateAppointment.module.css'
import { useRouter } from "next/router";
// import { patientContext } from "../../../context/odontology/patient/patientContext";
import { Modal, Loading } from "@nextui-org/react";
import { appointmentContext } from "../../../../context/odontology/work_table/appointment/appointmentContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import comunModalCss from "../../../../styles/modal.module.css";
import updateAppointmentCss from "./UpdateAppointment.module.css";
import {AppointmentInf} from "../../../../interface/odontology/appointmentInf";
import DeleteAppointment from "../deleteAppointment/DeleteAppointment";


const UpdateAppointment = () => {
  const {  msjSuccessAppointment, msjErrorAppointment,
           appointment, visibleAppointmentEdit, 
           loadingFormAppointment, setVisibleAppointmentEditFn,
           updateAppointmentFn
        } = useContext(appointmentContext);

  const initialValues = {
    today_date: appointment?.appointment_date,
    reason: appointment?.reason,
    description: appointment?.description,
  }
  const closeHandler = () => {
    setVisibleAppointmentEditFn(false);
  };

  async function formHandler(values : any){
    const new_appointment : AppointmentInf = {
      id: appointment.id,
      appointment_date: values.today_date,
      reason: values.reason,
      description: values.description,
    }
    await updateAppointmentFn(new_appointment);
  }

 function validateTextareas(value: any){
  let error;

    if (!value.trim()) {
      error = "Campo requerido";
    }
    return error;
 }
 function validateDate(value: any){
  let error;

    if (!value) {
      error = "Campo requerido";
    }
    return error;
 }

 return (
    <Modal
        animated={false}
        width="100%"
        css={{ height: "100%", backgroundColor: "#302F2F" }}
        closeButton={!loadingFormAppointment}
        preventClose
        aria-labelledby="modal-title"
        open={visibleAppointmentEdit}
        onClose={closeHandler}
      >
        <Modal.Header
          css={{
            flexDirection: "column",
          }}
        >
          <div className={comunModalCss["header_container"]}>
            <div className={comunModalCss["header_title"]}>
              Editando un consulta
            </div>
            <div className={comunModalCss["header_subtitle"]}>
              (*) Atributos requeridos
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
        <div className={updateAppointmentCss["delete_button"]}>
          <DeleteAppointment/>
        </div>

        <Formik
                initialValues={initialValues}
                onSubmit={formHandler}
                validateOnChange={false}
                validateOnBlur={false}
              >
                <Form>
                  <div className={updateAppointmentCss["form_group"]}>
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
                    <div className={updateAppointmentCss["textarea_input"]}>
                      <Field
                        validate={validateTextareas}
                        as="textarea"
                        type="text"
                        name="reason"
                        placeholder="Escriba el motivo de la consulta"
                        style={{ resize: "none" }}
                        rows={2}
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
                      <div className={updateAppointmentCss["textarea_input"]}>
                        <Field
                          validate={validateTextareas}
                          as="textarea"
                          type="text"
                          name="description"
                          placeholder="Escriba el descripción de la consulta"
                          style={{ resize: "none" }}
                          rows={10}
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
                            (!loadingFormAppointment) ? 
                            <span>Guardar</span>  
                          : 
                            (<Loading
                              type="spinner"
                              color="currentColor"
                              size="sm"
                            />)
                          }
                        </button>
                      </div>

                </Form>
                </Formik>
        </Modal.Body>
        <Modal.Footer>
           <div className={comunModalCss["footer_container"]}>
            {( msjSuccessAppointment )?(<div className={comunModalCss["msj_success"]}>{msjSuccessAppointment}</div>): null}
            {( msjErrorAppointment )?(<div className={comunModalCss["msj_error"]}>{msjErrorAppointment}</div>):null}
           </div>
        </Modal.Footer>
      </Modal>
  );
};

export default UpdateAppointment;