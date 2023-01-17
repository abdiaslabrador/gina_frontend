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
  const {  appointment, visibleAppointmentEdit, 
           loadingFormAppointment, setVisibleAppointmentEditFn,
           updateAppointmentFn
        } = useContext(appointmentContext);

  const initialValues = {
    today_date: appointment.appointment_date,
    reason: appointment.reason,
    description: appointment.description,
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

 return (
    <Modal
        animated={false}
        width="600px"
        css={{ height: "600px", backgroundColor: "#302F2F" }}
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
          {/* <div className={comunModalCss["header_container"]}>
            <div className={comunModalCss["header_title"]}>
              Creando un paciente
            </div>
            <div className={comunModalCss["header_subtitle"]}>
              (*) Atributos requeridos
            </div>
          </div> */}
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
                <div className={comunModalCss["form_group"]} >
                    <div className={comunModalCss["form_group__label"]}>
                      <label>Fecha de nacimiento*:</label>
                    </div>

                    <Field
                      // validate={validateBirthday}
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
                          rows={10}
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
           {/* <div className={comunModalCss["footer_container"]}>
            {( msjSuccessPatientList )?(<div className={comunModalCss["msj_success"]}>{msjSuccessPatientList}</div>): null}
            {( msjErrorPatientList )?(<div className={comunModalCss["msj_error"]}>{msjErrorPatientList}</div>):null}
           </div> */}
        </Modal.Footer>
      </Modal>
  );
};

export default UpdateAppointment;